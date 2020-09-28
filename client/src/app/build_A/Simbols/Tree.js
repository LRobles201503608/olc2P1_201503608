"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
/**
 * esta @clase almacena el ast generado y la lista de instrucciones
 * */
class Tree {
    constructor(instructions) {
        this.instructions = instructions;
        this.console = new Array();
        this.errores = new Array();
        this.repent = new Array();
    }
    setTable(table) {
        this.globalofensive = table;
    }
}
exports.Tree = Tree;
