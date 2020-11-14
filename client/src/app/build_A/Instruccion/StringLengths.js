"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lengths = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
/**
 * @class Reasigna el valor de una variable existente
 */
class Lengths extends Node_1.Node {
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
        try {
            if (variable.type.type == Types_1.types.STRING) {
                let vari = variable.value + "";
                let tam = vari.length;
                tree.generar_3d("", tam.toString(), "", "t" + tree.temp);
                tree.temp++;
            }
            else {
                const error = new Errors_1.Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier, this.linea, this.columna);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        catch (ex) {
            const error = new Errors_1.Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
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
            if (variable.type.type == Types_1.types.STRING) {
                let vari = variable.value + "";
                return vari.length;
            }
            else {
                const error = new Errors_1.Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier, this.linea, this.columna);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        catch (ex) {
            const error = new Errors_1.Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
    }
}
exports.Lengths = Lengths;
