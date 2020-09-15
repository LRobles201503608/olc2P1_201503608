"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logica = void 0;
const Errors_1 = require("../util/Errors");
const Node_1 = require("../Abstract/Node");
const Types_1 = require("../util/Types");
/**
 * Esta @clase creara un nodo de tipo @LOGICA
*/
class Logica extends Node_1.Node {
    /**
     *
     * @param izquierda es el operador izquierdo en la operacion logica
     * @param derecha es el operador derecho en la operacion logica
     * @param operador es el signo operador
     * @param linea linea donde se encuentra la operacion
     * @param columna columna donde se encuentra la operacion
     */
    constructor(izquierda, derecha, operador, linea, columna) {
        super(null, linea, columna, true);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.Operador = operador;
    }
    /**
     *
     * @param table tabla de simbolos
     * @param tree arbol de nodos
     */
    execute(table, tree) {
        if (this.derecha == null) {
            const izqresult = this.izquierda.execute(table, tree);
            if (izqresult instanceof Errors_1.Error) {
                return izqresult;
            }
            if (this.Operador == '!') {
                if (this.izquierda.type.type == Types_1.types.BOOLEAN) {
                    return !this.izquierda;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar el operador not con esta expresion', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Errors_1.Error('Semantico', 'Operador no reconocido', this.linea, this.columna);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        else {
            const izqresultado = this.izquierda.execute(table, tree);
            const derresultado = this.derecha.execute(table, tree);
            if (izqresultado instanceof Errors_1.Error) {
                return izqresultado;
            }
            if (derresultado instanceof Errors_1.Error) {
                return derresultado;
            }
            if (this.Operador == '||') {
                if (this.izquierda.type.type == Types_1.types.BOOLEAN && this.derecha.type.type == Types_1.types.BOOLEAN) {
                    return izqresultado || derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Tipos de datos no comparables por logicals', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '&&') {
                if (this.izquierda.type.type == Types_1.types.BOOLEAN && this.derecha.type.type == Types_1.types.BOOLEAN) {
                    return izqresultado && derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Tipos de datos no comparables por logicals', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                if (this.izquierda.type.type == Types_1.types.BOOLEAN && this.derecha.type.type == Types_1.types.BOOLEAN) {
                    return izqresultado || derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'Operador desconocido', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
        }
    }
}
exports.Logica = Logica;
