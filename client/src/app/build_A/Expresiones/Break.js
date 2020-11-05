"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Node_1 = require("../Abstract/Node");
/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
class Break extends Node_1.Node {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(line, column) {
        super(null, line, column, true);
    }
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        return this;
    }
}
exports.Break = Break;
