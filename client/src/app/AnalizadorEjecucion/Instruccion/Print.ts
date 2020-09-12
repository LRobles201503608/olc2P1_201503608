import {Node} from "../Abstract/Node";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type , types} from "../util/Types";

/*
* Impresion de las expresiones/variables/etc. en consola
*/

export class print extends Node{
expresion:Node;

  constructor(expresion:Node,linea:number,col:number){
    super(new Type(types.VOID),linea,col);
    this.expresion=expresion;
  }
// metodo de ejecucion que pertenece a la clase PRINT
  execute(table: Table, tree: Tree):any{
    const value=this.expresion.execute(table,tree);
    tree.console.push(value);
    return null;
  }

}
