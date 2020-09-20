import { Component, OnInit } from '@angular/core';
import {parser} from '../../build_A/public/analizador.js';
import {generateTree} from '../../TreeDraw/chart.js';
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

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {

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
  prueba(){
    alert(this.captura);
    const tree= parser.parse(this.captura);
    //console.log(tree);
    this.execute(tree);
    this.reporteast(tree.instructions);
  }
  execute(tree:any){
    const tabla = new Table(null);
    //console.log(tree);
    tree.instructions.map((m: any) => {
      const res = m.execute(tabla, tree);
      //console.log(res);
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
    let results= new Nodo_AST("Instrucciones",null,[]);
    /*linstrucciones.forEach(element => {
        console.log(element);
      if(element instanceof print){
          this.instrucciones.push(new print(element.type,element.linea,element.columna,element.editable,element.expresion));
        }
    });*/
    results.children.push(new Nodo_AST("EOF",null,[]));
    generateTree([results]);
  }
}
