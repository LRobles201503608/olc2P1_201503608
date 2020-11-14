"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharAt = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
/**
 * @class Reasigna el valor de una variable existente
 */
class CharAt extends Node_1.Node {
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
    }
    execute(table, tree) {
        let variable;
        variable = table.getVariable(this.identifier);
        let value_exp;
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        try {
            value_exp = this.expresion.execute(table, tree);
            let val = variable.value + "";
            let res = val.charAt(value_exp);
            return res;
        }
        catch (ex) {
            const error = new Errors_1.Error('Semantico', 'Operacion no valida ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
    }
}
exports.CharAt = CharAt;
