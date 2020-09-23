"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficarTS = void 0;
const Node_1 = require("../Abstract/Node");
const Simbol_1 = require("../Simbols/Simbol");
const Types_1 = require("../util/Types");
/*
* Esta clase imprime los ambientes
*/
class GraficarTS extends Node_1.Node {
    constructor(linea, col) {
        super(new Types_1.Type(Types_1.types.VOID), linea, col, true);
    }
    execute(table, tree) {
        let global = table;
        while (global.Previous != null) {
            global = global.Previous;
        }
        global.setVariable(new Simbol_1.Simbol(null, "global201503608", table, true));
        return null;
    }
}
exports.GraficarTS = GraficarTS;
