"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Errors_1 = require("../util/Errors");
const Node_1 = require("../Abstract/Node");
const Types_1 = require("../util/Types");
/**
 * Esta @clase creara un nodo de tipo @RELACIONAL
*/
class Relacional extends Node_1.Node {
    /**
     * @param izquierda corresponde a la parte izquierda de la operacion
     * @param derecha corresponde a la parte derecha de la operacion
     * @param operador operador relacional
     * @param linea linea de la operacion
     * @param columna columna de la operacion
     */
    constructor(izquierda, derecha, operador, linea, columna) {
        super(null, linea, columna, true);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.Operador = operador;
    }
    execute(table, tree) {
        if (this.derecha == null) {
            const error = new Errors_1.Error('Semantico', 'Se necesita del operador derecho', this.linea, this.columna);
            tree.errores.push(error);
            //tree.console.push(error.toString());
            return error;
        }
        else {
            const izqresultado = this.izquierda.execute(table, tree);
            const derresultado = this.derecha.execute(table, tree);
            //console.log(tree);
            //debugger;
            if (izqresultado instanceof Errors_1.Error) {
                return izqresultado;
            }
            if (derresultado instanceof Errors_1.Error) {
                return derresultado;
            }
            if (this.Operador == '<') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    return izqresultado < derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '>') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    return izqresultado > derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '<=') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    return izqresultado <= derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '>=') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    return izqresultado >= derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '==') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    return izqresultado == derresultado;
                }
                else if (this.izquierda.type.type == Types_1.types.STRING && this.derecha.type.type == Types_1.types.STRING) {
                    return izqresultado == derresultado;
                }
                else if (this.izquierda.type.type == Types_1.types.BOOLEAN && this.derecha.type.type == Types_1.types.BOOLEAN) {
                    return izqresultado == derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '!=') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    return izqresultado != derresultado;
                }
                else if (this.izquierda.type.type == Types_1.types.STRING && this.derecha.type.type == Types_1.types.STRING) {
                    return izqresultado != derresultado;
                }
                else if (this.izquierda.type.type == Types_1.types.BOOLEAN && this.derecha.type.type == Types_1.types.BOOLEAN) {
                    return izqresultado != derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Errors_1.Error('Semantico', 'Error signo operador desconocido', this.linea, this.columna);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
    }
}
exports.Relacional = Relacional;
