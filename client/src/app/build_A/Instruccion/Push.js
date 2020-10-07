"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pushs = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
/**
 * @class Reasigna el valor de una variable existente
 */
class Pushs extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, value, line, column, editable) {
        super(null, line, column, editable);
        this.identifier = identifier;
        this.value = value;
    }
    execute(table, tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Errors_1.Error) {
            return result;
        }
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        variable.value.push(result);
        return null;
    }
}
exports.Pushs = Pushs;
