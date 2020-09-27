import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Type, types } from "../util/Types";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class Returns extends Node {
  value:Object;
    expresion:Node;
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */

    constructor(expresion:Node,line: number, column: number) {
        super(null, line, column,true);
        this.expresion=expresion;
    }

    execute(table: Table, tree: Tree){
      if(this.expresion==null){
        this.type=new Type(types.VOID);
        this.value=null
        return this;
      }else{
        let result= this.expresion.execute(table,tree);
        this.type=this.expresion.type;
        this.value=result;
        return this;
      }
        //return this;
    }
}
