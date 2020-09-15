"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    /**
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
    */
    constructor(type, line, column, editable) {
        this.type = type;
        this.linea = line;
        this.columna = column;
        this.editable = editable;
    }
}
exports.Node = Node;
