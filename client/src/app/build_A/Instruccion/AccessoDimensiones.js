"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoArrays = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
/**
 * @class Reasigna el valor de una variable existente
 */
class AccesoArrays extends Node_1.Node {
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
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        //console.log(this.value);
        let variable;
        variable = table.getVariable(this.identifier);
        //debugger;
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let tam = this.value.length;
        if (tam == 1) {
            console.log(this.value[0].execute(table, tree));
            return variable.value[this.value[0].execute(table, tree)];
        }
        else if (tam == 2) {
            return variable.value[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)];
        }
        else if (tam == 3) {
            return variable.value[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)];
        }
        else if (tam == 4) {
            return variable.value[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)];
        }
        else if (tam == 5) {
            return variable.value[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)][this.value[4].execute(table, tree)];
        }
        else if (tam == 6) {
            return variable.value[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)][this.value[4].execute(table, tree)][this.value[5].execute(table, tree)];
        }
        else if (tam == 7) {
            return variable.value[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)][this.value[4].execute(table, tree)][this.value[5].execute(table, tree)][this.value[6].execute(table, tree)];
        }
    }
}
exports.AccesoArrays = AccesoArrays;
