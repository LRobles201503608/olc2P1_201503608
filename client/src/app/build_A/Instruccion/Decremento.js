"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decremento = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
/**
 * @class Reasigna el valor de una variable existente
 */
class Decremento extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Decremento
     * @param identifier nombre de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, line, column, editable) {
        super(null, line, column, editable);
        this.identifier = identifier;
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
        if (variable.type.type == null) {
            variable.type.type = Types_1.types.NUMERIC;
            return null;
        }
        if (variable.type.type != Types_1.types.NUMERIC) {
            const error = new Errors_1.Error('Semantico', `No se puede asignar la variable porque los tipos no coinciden.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.editable == false) {
            const error = new Errors_1.Error('Semantico', `No se puede asignar a la variable porque es una constante.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        variable.value = Number(variable.value) - 1;
        return variable.value;
    }
}
exports.Decremento = Decremento;