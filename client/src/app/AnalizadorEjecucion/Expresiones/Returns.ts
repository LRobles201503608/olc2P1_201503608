import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Type, types } from "../util/Types";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class Returns extends Node {
  value:Object; //valor de retorno
    expresion:Node; // expresion a retornar
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */

    constructor(expresion:Node,line: number, column: number) {
        super(null, line, column,true);
        this.expresion=expresion;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

    }
    execute(table: Table, tree: Tree){
      if(this.expresion==null){
        // cuando no viene una expresion me regresa un void
        this.type=new Type(types.VOID);
        // tampoco tiene valor porque no tiene una expresion
        this.value=null
        //retornamos la instacia de la clase
        return this;
      }else{
        //lo mismo de arriba pero este si trae tipo y trae valor :v
        let result= this.expresion.execute(table,tree);
        this.type=this.expresion.type;
        this.value=result; // el valor :v
        return this;
      }
        //return this;
    }
}
