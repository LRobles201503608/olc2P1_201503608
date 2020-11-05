"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strings = void 0;
const Node_1 = require("../Abstract/Node");
/**
 * La @class Strings es para los nodos de tipo de datos primitivos
 */
class Strings extends Node_1.Node {
    /**
     *
     * @param type tipo que tiene el valor primitivo
     * @param val valor primitivo
     * @param linea linea donde se encuentra
     * @param columna columna donde se encuentra
     */
    constructor(type, val, linea, columna) {
        super(type, linea, columna, true);
        this.val = val;
    }
    /**
     * @param table tabla de simbolos
     * @param tree arbol de nodos
     */
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        return this.val;
    }
}
exports.Strings = Strings;
