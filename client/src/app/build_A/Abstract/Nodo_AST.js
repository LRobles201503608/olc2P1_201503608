"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo_AST = void 0;
class Nodo_AST {
    constructor(name, parent, children) {
        this.name = name;
        this.parent = parent;
        this.children = children;
    }
}
exports.Nodo_AST = Nodo_AST;
