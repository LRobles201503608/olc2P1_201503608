"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo_AST = void 0;
class Nodo_AST {
    constructor(etiqueta, parent, children) {
        this.etiqueta = etiqueta;
        this.parent = parent;
        this.children = children;
    }
}
exports.Nodo_AST = Nodo_AST;
