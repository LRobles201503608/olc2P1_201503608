import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";
import { Simbol } from "../Simbols/Simbol";
import { Cases } from "./Cases";
import { Default } from "./Default";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class Switch extends Node {
    declaracion:String;
    condition: Node;
    asignacion:Node;
    expresiondecla:Node;
    List: Array<Node>;
    line:number;
    column:number;
    /**
     * @constructor
     * @param condition
     *
     * @param List
     * @param line
     * @param column
     */
    constructor(condition:Node ,List: Array<Node>, line: number, column: number) {
        super(null, line, column,true);
        this.condition = condition;
        this.List = List;
        this.column=column;
        this.line=line;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

    }
    execute(table: Table, tree: Tree):any {
      let newtable=new Table(table);
      let valcondi=this.condition.execute(newtable,tree);
      let conteoEncuentra=0;
      for (let a = 0; a < this.List.length; a++) {
        const element = this.List[a];
        if(element instanceof Cases){
          let valcase= element.condition.execute(newtable,tree);
          if(valcondi==valcase && conteoEncuentra==0){
            element.execute(newtable,tree);
            conteoEncuentra++;
          }
        }else if(element instanceof Default){
          if(conteoEncuentra==0){
            element.execute(newtable,tree);
          }
        }
      }
  }
}
