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
        //debugger;
        let inicio = 0;
        let final = 0;
        for (let a = 0; a < this.val.toString().length; a++) {
            if (a == 0) {
                tree.inicioStringHeap = tree.posh;
                inicio = tree.inicioStringHeap;
                let val = this.val.toString().charCodeAt(a);
                let sigval = this.val.toString().charCodeAt(a + 1);
                if (val == 92) {
                    if (sigval == 110) {
                        val = 10;
                        a++;
                    }
                    else if (sigval == 116) {
                        val = 9;
                        a++;
                    }
                    else if (sigval == 114) {
                        val = 13;
                        a++;
                    }
                }
                tree.modificar_heap(inicio.toString(), val.toString());
                tree.posh++;
            }
            else if (a == this.val.toString().length - 1) {
                tree.finStringHeap = tree.posh;
                final = tree.finStringHeap;
                let val = this.val.toString().charCodeAt(a);
                tree.modificar_heap(final.toString(), val.toString());
                tree.posh += 350;
            }
            else {
                let val = this.val.toString().charCodeAt(a);
                let sigval = this.val.toString().charCodeAt(a + 1);
                if (val == 92) {
                    if (sigval == 110) {
                        val = 10;
                        a++;
                    }
                    else if (sigval == 116) {
                        val = 9;
                        a++;
                    }
                    else if (sigval == 114) {
                        val = 13;
                        a++;
                    }
                }
                tree.modificar_heap(tree.posh.toString(), val.toString());
                tree.posh++;
            }
        }
    }
    execute(table, tree) {
        return this.val;
    }
}
exports.Strings = Strings;
