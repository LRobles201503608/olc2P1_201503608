import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";

/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
export class Break extends Node {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(line: Number, column: Number) {
        super(null, line, column);
    }

    execute(table: Table, tree: Tree){
        return this;
    }
}
