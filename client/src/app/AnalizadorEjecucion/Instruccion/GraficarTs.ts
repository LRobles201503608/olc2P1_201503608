import {Node} from "../Abstract/Node";
import { Simbol } from "../Simbols/Simbol";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type , types} from "../util/Types";

/*
* Esta clase imprime los ambientes
*/
export class GraficarTS extends Node{
  constructor(linea:number,col:number){
    super(new Type(types.VOID),linea,col,true);
  }

  execute(table: Table, tree: Tree):any{
    let global=table;

    while(global.Previous!=null){
      global=global.Previous;
    }
    global.setVariable(new Simbol(null,"global201503608",table,true));
    return null;
  }

}
