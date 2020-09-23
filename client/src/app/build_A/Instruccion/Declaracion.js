"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Simbol_1 = require("../Simbols/Simbol");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaracion extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type, identifier, value, line, column, editable) {
        super(type, line, column, editable);
        this.identifier = identifier;
        this.value = value;
        this.edit = editable;
    }
    execute(table, tree) {
        let result;
        if (this.value != null) {
            result = this.value.execute(table, tree);
        }
        else {
            result = null;
        }
        if (result instanceof Errors_1.Error) {
            return result;
        }
        if (result != null) {
            if (this.type == null) {
                if (this.value.type != null) {
                    this.type = new Types_1.Type(this.value.type.type);
                }
                else {
                    this.type = new Types_1.Type(Types_1.types.NUMERIC);
                }
            }
            if (this.value.type != null) {
                if (this.type.type != this.value.type.type) {
                    const error = new Errors_1.Error('Semantico', 'Los tipos de datos no coinciden', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
        }
        let simbol;
        simbol = new Simbol_1.Simbol(this.type, this.identifier, result, this.edit);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Errors_1.Error('Semantico', res, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
        }
        return null;
    }
}
exports.Declaracion = Declaracion;