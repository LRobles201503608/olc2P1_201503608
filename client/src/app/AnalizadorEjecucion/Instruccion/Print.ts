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
    super(new Type(types.VOID),linea,col,true);
    this.expresion=expresion;
  }
  traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

  }
// metodo de ejecucion que pertenece a la clase PRINT
  execute(table: Table, tree: Tree):any{
    if(String(this.expresion)=="\\n"){
      tree.console.push("\\n");
      return null;
    }
    const value=this.expresion.execute(table,tree);
    tree.console.push(value);
    return null;
  }

}
