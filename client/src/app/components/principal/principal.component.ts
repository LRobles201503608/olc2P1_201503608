import { Component, OnInit } from '@angular/core';
import {parser} from '../../build_A/public/analizador.js';
import {Node} from '../../build_A/Abstract/Node';
import {Nodo_AST} from '../../build_A/Abstract/Nodo_AST';
import {Primitivos}from '../../build_A/Expresiones/Primitivos';
import {Aritmetica} from '../../build_A/Expresiones/Aritmeticas';
import {Relacional} from '../../build_A/Expresiones/Relacional';
import {Logica} from '../../build_A/Expresiones/Logicas';
import {Identifier} from '../../build_A/Expresiones/Identifier';
import {print} from '../../build_A/Instruccion/Print';
import {Error} from '../../build_A/util/Errors';
import {Type, types} from '../../build_A/util/Types';
import {Tree} from '../../build_A/Simbols/Tree';
import {If} from '../../build_A/Instruccion/If';
import {DoWhile} from '../../build_A/Instruccion/DoWhile';
import {While} from '../../build_A/Instruccion/While';
import {Declaracion} from '../../build_A/Instruccion/Declaracion';
import {Asignacion} from '../../build_A/Instruccion/Asignacion';
import {Table} from '../../build_A/Simbols/Table';
import {Incremento} from '../../build_A/Instruccion/Incremento'
import {Decremento} from '../../build_A/Instruccion/Decremento'
import { ParsedEvent } from '@angular/compiler';
import { element } from 'protractor';
import {GraficarTS} from '../../build_A/Instruccion/GraficarTs';

declare var generateTree;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {
  tree:any;
  captura:any='';
  arbol:Tree;
  instrucciones:Array<Node>;
  console2:string='';
  translate:any='';
  constructor() { }
  codeMirrorOptions: any = {
    theme: 'yonce',
    mode: 'application/javascript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };
  codeMirrorOptions2: any = {
    theme: 'lint',
    mode: 'application/text',
    readOnly:true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };
  codeMirrorOptions3: any = {
    theme: 'zenburn',
    mode: 'application/javascript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };


  ngOnInit() {
  }
  RepErrores(){
    let tbl2 = document.getElementById("errores");
    let filas_e = "";
    let con_errores = 0;
    for (let i = 0; i < this.tree.errores.length; i++) {
        con_errores++;
        filas_e += "<tr ><td>" + con_errores + "</td>" +"<td>" + this.tree.errores[i].tipo+ "</td>" + "<td>" + this.tree.errores[i].descripcion + "<td>" + this.tree.errores[i].linea + "</td>" + "<td>" + this.tree.errores[i].columna  + "</tr>";
    }
    tbl2.innerHTML = filas_e;
  }
  prueba(){
    alert(this.captura);
    this.tree= parser.parse(this.captura);
    console.log(this.tree);
    this.execute(this.tree);
    this.reporteast(this.tree.instructions);
  }
  execute(tree:any){
    const tabla = new Table(null);
    //console.log(tree);
    tree.instructions.map((m: any) => {
      const res = m.execute(tabla, tree);
      if(m instanceof Declaracion){
        console.log("se viene se viene");
      }
      if(m instanceof GraficarTS){
        this.reporteGraficarTs(tabla);
      }

      //console.log(m);

    });
    this.llenarConsola(tree.console);
  }
  llenarConsola(consola){
    //console.log(consola);
    const regex = /\\n/gi;
    const regex2 = /\\t/gi;
    const regex3 =/\\r/gi;
    let conss;
    this.console2='';
    for(let a=0; a<consola.length;a++){
      conss=String(consola[a]).replace(regex,'\n').replace(regex2,'\t').replace(regex3,'\r');
      this.console2+=conss+'\n';
    }
    //console.log(this.console2);
  }
  reporteast(linstrucciones:any){
    if (document.getElementById("grafo")) {
      document.getElementById("grafo").remove();
    }
    let results= new Nodo_AST("INSTRUCCIONES",null,[]);
    linstrucciones.forEach(element => {
      let raiz:Nodo_AST=this.instructionsUnion(element);
      raiz.parent=results;
      results.children.push(raiz);
    });
    results.children.push(new Nodo_AST("EOF",null,[]));
    generateTree([results]);
  }

  instructionsUnion(actual){
      if(actual != ";"||actual instanceof Number){
        //console.log(actual);
        let raiz= new Nodo_AST("",null,[]);
        let hijo:Nodo_AST;
        if(actual instanceof print){
          raiz.name="PRINT";
          hijo=this.expresionesUnion(actual.expresion);
          hijo.parent=raiz;
          raiz.children.push(hijo);
        }
        if(actual instanceof Declaracion){
          raiz.name="DECLARACION";
          hijo=new Nodo_AST("IDENTIFICADOR",null,[]);
          hijo.parent=raiz;
          hijo.children.push(new Nodo_AST(actual.identifier,hijo,[]));
          raiz.children.push(hijo);
          if(actual.value!=null){
            let hijo2= this.expresionesUnion(actual.value);
            hijo2.parent=raiz;
            raiz.children.push(hijo2);
          }
        }
        if(actual instanceof Asignacion){
          raiz.name="ASIGNACION";
          hijo=new Nodo_AST("IDENTIFICADOR",null,[]);
          hijo.parent=raiz;
          hijo.children.push(new Nodo_AST(actual.identifier,hijo,[]));
          raiz.children.push(hijo);
          if(actual.value!=null){
            let hijo2= this.expresionesUnion(actual.value);
            hijo2.parent=raiz;
            raiz.children.push(hijo2);
          }
        }
        if(actual instanceof If){
          raiz.name="IF";
          let condition=new Nodo_AST("CONDICION",raiz,[]);
          condition.children.push(this.expresionesUnion(actual.condition));
          raiz.children.push(condition);
          let ifs=new Nodo_AST("IFLIST",null,[]);
          actual.IfList.forEach(element => {
            if(element != ";"){
              hijo=this.instructionsUnion(element);
              hijo.parent=ifs;
              ifs.children.push(hijo);
            }
          });
          raiz.children.push(ifs);
          let elses=new Nodo_AST("ELSE",null,[]);
          actual.ElseList.forEach(element => {
            if(element != ";"){
              hijo=this.instructionsUnion(element);
              hijo.parent=elses;
              elses.children.push(hijo);
            }
          });
          raiz.children.push(elses);
        }
        if(actual instanceof Incremento){
          let identifier = new Nodo_AST("INCREMENTO",raiz,[]);
          identifier.children.push(new Nodo_AST(actual.identifier,null,[]));
          raiz.children.push(identifier);
        }
        if(actual instanceof Decremento){
          let identifier = new Nodo_AST("DECREMENTO",raiz,[]);
          identifier.children.push(new Nodo_AST(actual.identifier,null,[]));
          raiz.children.push(identifier);
        }
        console.log(raiz);
        return raiz;
      }
      return;
  }
  expresionesUnion(actual){
    console.log(actual);
    let expresion = new Nodo_AST("EXPRESION",null,[]);
    if(actual instanceof Aritmetica){
      if(actual.izquierda!=null){
        let izquierda: Nodo_AST=this.expresionesUnion(actual.izquierda);
        izquierda.parent=expresion;
        expresion.children.push(izquierda);
      }
      expresion.children.push(new Nodo_AST(actual.Operador,expresion,[]));
      if(actual.derecha!=null){
        let derecha: Nodo_AST=this.expresionesUnion(actual.derecha);
        derecha.parent=expresion;
        expresion.children.push(derecha);
      }
    }
    if(actual instanceof Logica){
      if(actual.izquierda!=null){
        let izquierda: Nodo_AST=this.expresionesUnion(actual.izquierda);
        izquierda.parent=expresion;
        expresion.children.push(izquierda);
      }
      expresion.children.push(new Nodo_AST(actual.Operador,expresion,[]));
      if(actual.derecha!=null){
        let derecha: Nodo_AST=this.expresionesUnion(actual.derecha);
        derecha.parent=expresion;
        expresion.children.push(derecha);
      }
    }
    if(actual instanceof Relacional){
      if(actual.izquierda!=null){
        let izquierda: Nodo_AST=this.expresionesUnion(actual.izquierda);
        izquierda.parent=expresion;
        expresion.children.push(izquierda);
      }
      expresion.children.push(new Nodo_AST(actual.Operador,expresion,[]));
      if(actual.derecha!=null){
        let derecha: Nodo_AST=this.expresionesUnion(actual.derecha);
        derecha.parent=expresion;
        expresion.children.push(derecha);
      }
    }
    if(actual instanceof Primitivos){
      let primitivo=new Nodo_AST("PRIMITIVO",expresion,[]);
      primitivo.children.push(new Nodo_AST(actual.val,null,[]));
      expresion.children.push(primitivo);
    }
    if(actual instanceof Identifier){
      let identifier = new Nodo_AST("IDENTIFICADOR",expresion,[]);
      identifier.children.push(new Nodo_AST(actual.iden,null,[]));
      expresion.children.push(identifier);
    }
    if(actual instanceof Incremento){
      let identifier = new Nodo_AST("INCREMENTO",expresion,[]);
      identifier.children.push(new Nodo_AST(actual.identifier,null,[]));
      expresion.children.push(identifier);
    }
    if(actual instanceof Decremento){
      let identifier = new Nodo_AST("DECREMENTO",expresion,[]);
      identifier.children.push(new Nodo_AST(actual.identifier,null,[]));
      expresion.children.push(identifier);
    }
    return expresion;
  }

  reporteGraficarTs(tabla:any){
    let entorno=tabla.getVariable("global201503608");
    if(entorno==null){
      alert("Está intentando graficar entornos sin un entorno creado");
    }
    else{

    }
  }
}
