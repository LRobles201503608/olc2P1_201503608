import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class Returns extends Node {
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
        return this;
    }
}
