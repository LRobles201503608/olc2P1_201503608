"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpperCase = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
/**
 * @class Reasigna el valor de una variable existente
 */
class UpperCase extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, line, column, editable) {
        super(null, line, column, editable);
        this.identifier = identifier;
    }
    traducir(tabla, tree, cadena, contTemp) {
        let variable;
        variable = tabla.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let inicio = 0;
        let final = 0;
        //debugger;
        let valu = variable.value.toString().toUpperCase();
        for (let a = 0; a < valu.length; a++) {
            if (a == 0) {
                tree.inicioStringHeap = tree.posh;
                inicio = tree.inicioStringHeap;
                let val = valu.charCodeAt(a);
                let sigval = valu.charCodeAt(a + 1);
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
            else if (a == valu.toString().length - 1) {
                tree.finStringHeap = tree.posh;
                final = tree.finStringHeap;
                let val = valu.toString().charCodeAt(a);
                tree.modificar_heap(final.toString(), val.toString());
                tree.posh += 350;
            }
            else {
                let val = valu.toString().charCodeAt(a);
                let sigval = valu.toString().charCodeAt(a + 1);
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
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        return variable.value.toString().toUpperCase();
    }
}
exports.UpperCase = UpperCase;
