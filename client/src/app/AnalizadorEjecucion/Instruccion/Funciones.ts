import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";
import { Simbol } from "../Simbols/Simbol";

export class Funciones extends Node {
identifier:string;
parameters:Array<Node>;
instructions:Array<Node>;
  constructor(indentificador:string,tipo:Type,parametros:Array<Node>,instrucciones:Array<Node>, line: number, column: number){
    super(tipo,line,column,true);
    this.identifier=indentificador;
    this.parameters=parametros;
    this.instructions=instrucciones;
  }
  traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

  }
  execute(table: Table, tree: Tree) {
    let simbol;
    const newtable=new Table(table);
    simbol = new Simbol(this.type, this.identifier, null, true,this.instructions,this.parameters);
    const res = table.setVariable(simbol);

    if (res != null) {
        const error = new Error('Semantico', res, this.linea, this.columna);
        tree.errores.push(error);
        //tree.console.push(error.toString());
        return error;
    }
    if(this.parameters!=null){
      this.parameters.forEach(element=>{
        element.execute(newtable,tree);
      });
      console.log("HOLIIIIIIIIIIIIIIIII");
      //console.log(newtable);
    }
    return null;
  }


}
