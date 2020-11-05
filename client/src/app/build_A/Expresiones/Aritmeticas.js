"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Errors_1 = require("../util/Errors");
const Node_1 = require("../Abstract/Node");
const Types_1 = require("../util/Types");
const Relacional_1 = require("./Relacional");
const Logicas_1 = require("./Logicas");
const LlamadaFuncion_1 = require("../Instruccion/LlamadaFuncion");
const Length_1 = require("../Instruccion/Length");
const Primitivos_1 = require("./Primitivos");
const Identifier_1 = require("./Identifier");
/**
 * Esta @clase creara un nodo de tipo @ARITMETICA
*/
class Aritmetica extends Node_1.Node {
    /**
     * El @constructor estará conformado de la siguiente manera
     * @izquierda es la parte izquierda de la expresion (@nodos )
     * @derecha es la parte derecha de la expresion (@nodos )
     * @operador es la operacion que vamos a realizar
     * @linea linea donde se encuentra
     * @columna columna donde se encuentra
    */
    constructor(izquierda, derecha, operador, linea, columna) {
        super(null, linea, columna, true);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.Operador = operador;
    }
    traducir(tabla, tree, cadena, contTemp) {
        //debugger;
        if (this.derecha != null) {
            let izq = this.izquierda.traducir(tabla, tree, cadena, contTemp);
            let der = this.derecha.traducir(tabla, tree, cadena, contTemp);
            if (izq instanceof Errors_1.Error) {
                return izq;
            }
            else if (der instanceof Errors_1.Error) {
                return der;
            }
            if (this.Operador == "+") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("+", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("+", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("+", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("+", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("+", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == "-") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("-", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("-", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("-", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("-", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("-", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == "*") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("*", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("*", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("*", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("*", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("*", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == "/") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("/", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("/", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("/", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("/", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("/", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == "**") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    }
                    else {
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    }
                    else {
                    }
                }
                else {
                }
            }
            else if (this.Operador == "%") {
                if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    tree.generar_3d("%", izq, der, "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
                else {
                    let temp = tree.tmpsop.pop();
                    tree.generar_3d("%", izq, temp.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    tree.generar_3d("%", izq, der, "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
                else {
                    let temp = tree.tmpsop.pop();
                    tree.generar_3d("%", temp.toString(), der, "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
        }
        else {
            if (this.Operador == '-') {
            }
            else if (this.Operador == '--') {
                let izq = this.izquierda.traducir(tabla, tree, cadena, contTemp);
                if (izq instanceof Errors_1.Error) {
                    return izq;
                }
                if (this.izquierda instanceof Identifier_1.Identifier) {
                    tree.generar_3d("-", izq, "1", "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == '++') {
                let izq = this.izquierda.traducir(tabla, tree, cadena, contTemp);
                if (izq instanceof Errors_1.Error) {
                    return izq;
                }
                if (this.izquierda instanceof Identifier_1.Identifier) {
                    tree.generar_3d("+", izq, "1", "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
        }
        //tree.tmpsop=new Array<String>();
        return;
    }
    execute(table, tree) {
        if (this.derecha == null) {
            const izqresultado = this.izquierda.execute(table, tree);
            if (izqresultado instanceof Errors_1.Error) {
                return izqresultado;
            }
            if (this.Operador == '-') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC) {
                    this.type = new Types_1.Type(Types_1.types.NUMERIC);
                    return -1 * izqresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar el operador unario', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '--') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC) {
                    this.type = new Types_1.Type(Types_1.types.NUMERIC);
                    return izqresultado - 1;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar el operador unario', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '++') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC) {
                    this.type = new Types_1.Type(Types_1.types.NUMERIC);
                    return izqresultado + 1;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar el operador unario', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Errors_1.Error('Semantico', 'No existe el operador unario', this.linea, this.columna);
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
            if (this.derecha instanceof Relacional_1.Relacional || this.derecha instanceof Logicas_1.Logica || this.derecha instanceof LlamadaFuncion_1.LlamadaFuncion || this.derecha instanceof Length_1.Lengths) {
                if (this.derecha.type == null) {
                    this.derecha.type = new Types_1.Type(Types_1.types.NUMERIC);
                }
            }
            if (this.izquierda instanceof Relacional_1.Relacional || this.izquierda instanceof Logicas_1.Logica || this.izquierda instanceof LlamadaFuncion_1.LlamadaFuncion || this.izquierda instanceof Length_1.Lengths) {
                if (this.izquierda.type == null) {
                    this.izquierda.type = new Types_1.Type(Types_1.types.NUMERIC);
                }
            }
            if (this.Operador == '+') {
                //debugger;
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    this.type = new Types_1.Type(Types_1.types.NUMERIC);
                    return izqresultado + derresultado;
                }
                else if (this.izquierda.type.type == Types_1.types.STRING || this.derecha.type.type == Types_1.types.STRING) {
                    this.type = new Types_1.Type(Types_1.types.STRING);
                    return izqresultado + derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '-') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    this.type = new Types_1.Type(Types_1.types.NUMERIC);
                    return izqresultado - derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '*') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    this.type = new Types_1.Type(Types_1.types.NUMERIC);
                    return izqresultado * derresultado;
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '/') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    if (derresultado == 0) {
                        const error = new Errors_1.Error('Semantico', 'No se puede operar porque el operador derecho es 0', this.linea, this.columna);
                        tree.errores.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    else {
                        this.type = new Types_1.Type(Types_1.types.NUMERIC);
                        return izqresultado / derresultado;
                    }
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '**') {
                if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                    if (izqresultado == 0 && derresultado == 0) {
                        const error = new Errors_1.Error('Semantico', 'No se puede operar porque el operador izquierdo y derecho es 0', this.linea, this.columna);
                        tree.errores.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    else {
                        this.type = new Types_1.Type(Types_1.types.NUMERIC);
                        return izqresultado ** derresultado;
                    }
                }
                else {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
            }
            else if (this.Operador == '%') {
                if (derresultado == 0) {
                    const error = new Errors_1.Error('Semantico', 'No se puede operar porque el operador derecho es 0', this.linea, this.columna);
                    tree.errores.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
                else {
                    if (this.izquierda.type.type == Types_1.types.NUMERIC && this.derecha.type.type == Types_1.types.NUMERIC) {
                        this.type = new Types_1.Type(Types_1.types.NUMERIC);
                        return izqresultado % derresultado;
                    }
                    else {
                        const error = new Errors_1.Error('Semantico', 'No se puede operar porque uno de los operadores no es un numero', this.linea, this.columna);
                        tree.errores.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                }
            }
            else {
                const error = new Errors_1.Error('Semantico', 'No existe el operador', this.linea, this.columna);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
    }
}
exports.Aritmetica = Aritmetica;
