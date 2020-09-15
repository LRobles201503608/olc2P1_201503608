"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
const Node_1 = require("../Abstract/Node");
const Types_1 = require("../util/Types");
/*
* Impresion de las expresiones/variables/etc. en consola
*/
class print extends Node_1.Node {
    constructor(expresion, linea, col) {
        super(new Types_1.Type(Types_1.types.VOID), linea, col, true);
        this.expresion = expresion;
    }
    // metodo de ejecucion que pertenece a la clase PRINT
    execute(table, tree) {
        const value = this.expresion.execute(table, tree);
        tree.console.push(value);
        return null;
    }
}
exports.print = print;
