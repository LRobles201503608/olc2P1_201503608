"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
/**
 * @class Reasigna el valor de una variable existente
 */
class Incremento extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Incremento
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
        variable.value = Number(variable.value) + 1;
        return null;
    }
}
exports.Incremento = Incremento;
