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

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class Cases extends Node {
    declaracion:String;
    condition: Node;
    asignacion:Node;
    expresiondecla:Node;
    List: Array<Node>;
    line:number;
    column:number;
    /**
     * @constructor
     * @param declaracion nodo de declaraciones
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
      let newtable;
      for (let i = 0; i < this.List.length; i++) {
        newtable= new Table(table);
        table.hijos.push(newtable);
        const res = this.List[i].execute(newtable, tree);
        if (res instanceof Continue) {
          break;
        }
        else if (res instanceof Break) {
            return;
        }
      }
  }
}
