"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Returns = void 0;
const Node_1 = require("../Abstract/Node");
/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
class Returns extends Node_1.Node {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(expresion, line, column) {
        super(null, line, column, true);
        this.expresion = expresion;
    }
    execute(table, tree) {
        return this;
    }
}
exports.Returns = Returns;
