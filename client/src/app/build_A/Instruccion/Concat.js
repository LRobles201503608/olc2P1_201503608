"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concat = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
/**
 * @class Reasigna el valor de una variable existente
 */
class Concat extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, expresion, line, column, editable) {
        super(null, line, column, editable);
        this.identifier = identifier;
        this.expresion = expresion;
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
        try {
            let inicio = 0;
            let fin = 0;
            inicio = variable.iniciostring;
            fin = variable.finstring;
            let val = this.expresion.execute(tabla, tree) + "";
            for (let a = 0; a < val.length; a++) {
                let act = val.charCodeAt(a);
                let sigval = val.charCodeAt(a + 1);
                if (act == 92) {
                    if (sigval == 110) {
                        act = 10;
                        a++;
                    }
                    else if (sigval == 116) {
                        act = 9;
                        a++;
                    }
                    else if (sigval == 114) {
                        act = 13;
                        a++;
                    }
                }
                tree.modificar_heap(fin.toString(), act.toString());
                fin++;
            }
            variable.finstring = fin;
        }
        catch (ex) {
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
        try {
            let vari = variable.value.toString();
            let val = this.expresion.execute(table, tree);
            let res = vari + val;
            return res;
        }
        catch (ex) {
            const error = new Errors_1.Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
    }
}
exports.Concat = Concat;
