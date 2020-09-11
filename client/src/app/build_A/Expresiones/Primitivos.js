"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivos = void 0;
const Node_1 = require("../Abstract/Node");
/**
 * La @class Primitivos es para los nodos de tipo de datos primitivos
 */
class Primitivos extends Node_1.Node {
    /**
     *
     * @param type tipo que tiene el valor primitivo
     * @param val valor primitivo
     * @param linea linea donde se encuentra
     * @param columna columna donde se encuentra
     */
    constructor(type, val, linea, columna) {
        super(type, linea, columna);
        this.val = val;
    }
    /**
     * @param table tabla de simbolos
     * @param tree arbol de nodos
     */
    execute(table, tree) {
        return this.val;
    }
}
exports.Primitivos = Primitivos;
