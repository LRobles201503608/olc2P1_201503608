import { Component, OnInit } from '@angular/core';
import {parser} from '../../build_A/public/analizador.js';
import {generateTree} from '../../TreeDraw/chart.js';
import {Node} from '../../build_A/Abstract/Node'
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
  constructor() { }

  ngOnInit() {
  }
  prueba(){
    alert(this.captura);
    const tree= parser.parse(this.captura);
    //console.log(tree);
    this.execute(tree);
    //this.reporteast(tree.instructions);
  }
  execute(tree:any){
    const tabla = new Table(null);
    tree.instructions.map((m: any) => {
      const res = m.execute(tabla, tree);
      //console.log(res);
    });
    console.log(tree);
  }
  reporteast(linstrucciones:any){
    if (document.getElementById("grafo")) {
      document.getElementById("grafo").remove();
    }
    this.instrucciones=new Array<Node>();
    this.arbol=new Tree(this.instrucciones);
    linstrucciones.forEach(element => {
        console.log(element);
      if(element instanceof print){
          this.instrucciones.push(new print(element.type,element.linea,element.columna,element.editable,element.expresion));
        }
    });
    console.log(this.arbol);
    generateTree(this.instrucciones);
  }
}
