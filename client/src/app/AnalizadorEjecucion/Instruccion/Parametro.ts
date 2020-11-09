import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";
import { Simbol } from "../Simbols/Simbol";

export class Parametro extends Node {
identifier:string;
parameters:Array<Node>;
instructions:Array<Node>;
  constructor(indentificador:string,tipo:Type, line: number, column: number){
    super(tipo,line,column,true);
    this.identifier=indentificador;
  }
  traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

  }
  execute(table: Table, tree: Tree) {
    /*this.parameters.forEach(element => {
      let simbol;
      simbol = new Simbol(this.type, this.identifier, null, true,null,null);
      const res = table.setVariable(simbol);
      if (res != null) {
          const error = new Error('Semantico', res, this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
      }
      return null;
    });*/
    let simbol;
    simbol = new Simbol(this.type, this.identifier, null, true,null,null,this.linea,this.columna);
    const res = table.setVariable(simbol);
    if (res != null) {
        const error = new Error('Semantico', res, this.linea, this.columna);
        tree.errores.push(error);
        tree.console.push(error.toString());
        return error;
    }
    return null;
  }


}
