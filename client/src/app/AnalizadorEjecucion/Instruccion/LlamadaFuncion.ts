import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";
import { Simbol } from "../Simbols/Simbol";
import { Returns } from "../Expresiones/Returns";

export class LlamadaFuncion extends Node {
identifier:string;
parameters:Array<Node>;
  constructor(indentificador:string,parametros:Array<Node>, line: number, column: number){
    super(null,line,column,true);
    this.identifier=indentificador;
    this.parameters=parametros;
  }
  traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

  }
  execute(table: Table, tree: Tree) {
    //asignaciones de valores a los parametros, si viene nulo no hace nada

    let entorno=table.getVariable(this.identifier);
    //console.log(this.parameters);
    //console.log(entorno);
    //debugger;
    const newtable= new Table(tree.globalofensive);
    tree.globalofensive.hijos.push(newtable);
    //debugger;
    if(this.parameters==null||entorno.parameters==null){

    }else{
      if(this.parameters.length==entorno.parameters.length){
        for(let a=entorno.parameters.length-1;a>=0;a--){
          let tamanio=entorno.parameters.length;
          let result;
          if(this.parameters!=null){
            //debugger;
            result = this.parameters[tamanio-(a+1)].execute(table, tree);
          } else{
            result =null;
          }
          if (result instanceof Error) {
            return result;
          }
          let simbol;
          if(entorno.parameters[a].type!=null){
            simbol = new Simbol(entorno.parameters[a].type, entorno.parameters[a].identifier, result, true,null,null,this.linea,this.columna);
          }else{
            simbol = new Simbol(null, entorno.parameters[a].identifier, result, true,null,null,this.linea,this.columna);
          }
          const res = newtable.setVariable(simbol);
          if (res != null) {
              const error = new Error('Semantico', res, this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
          }
        }
      }else{
        const error = new Error('Semantico', `Funcion encontrada pero con parametros distintos.`, this.linea, this.columna);
        tree.errores.push(error);
        return error;
      }

    }


    //console.log(entorno);
    if(entorno==null){
      const error = new Error('Semantico', `No se puede encontrar la funcion.`, this.linea, this.columna);
        tree.errores.push(error);
        return error;
    }
    let instructions=entorno.insfunc;
    //const newtable= new Table(table);
    if(instructions==null){

    }else{
      let contadorreturn=0;
      let resultado;
      //debugger;
      for (let x = 0; x < instructions.length; x++) {
        //debugger;
        const element = instructions[x];
        //console.log(element);
        //debugger;
        if(element instanceof Returns){
          resultado = element.expresion.execute(newtable,tree);
          //debugger;
          this.type=resultado.type;
          return resultado;
        }
        let a=element.execute(newtable,tree);
        if(a instanceof Returns){
          //debugger;
          this.type=a.type;
          //console.log("funciona mierda funciona "+a.value);
          return a.value;
        }
      }
    }

  }


}
