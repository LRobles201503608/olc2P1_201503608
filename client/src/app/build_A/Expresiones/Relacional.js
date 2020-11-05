"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Errors_1 = require("../util/Errors");
const Node_1 = require("../Abstract/Node");
const Types_1 = require("../util/Types");
const Primitivos_1 = require("./Primitivos");
const Identifier_1 = require("./Identifier");
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
    traducir(tabla, tree, cadena, contTemp) {
        if (this.derecha != null) {
            let izq = this.izquierda.traducir(tabla, tree, cadena, contTemp);
            let der = this.derecha.traducir(tabla, tree, cadena, contTemp);
            if (izq instanceof Errors_1.Error) {
                return izq;
            }
            else if (der instanceof Errors_1.Error) {
                return der;
            }
            if (this.Operador == "<") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("<", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("<", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("<", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("<", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("<", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == ">") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d(">", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d(">", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d(">", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d(">", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d(">", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == "<=") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("<=", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("<=", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("<=", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("<=", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("<=", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == ">=") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d(">=", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d(">=", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d(">=", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d(">=", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d(">=", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == "==") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("==", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("==", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("==", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("==", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("==", temp2.toString(), temp1.toString(), "t" + tree.temp);
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
            }
            else if (this.Operador == "!=") {
                if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                    if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                        tree.generar_3d("!=", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("!=", izq, temp.toString(), "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else if (this.derecha instanceof Primitivos_1.Primitivos || this.derecha instanceof Identifier_1.Identifier) {
                    if (this.izquierda instanceof Primitivos_1.Primitivos || this.izquierda instanceof Identifier_1.Identifier) {
                        tree.generar_3d("!=", izq, der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                    else {
                        let temp = tree.tmpsop.pop();
                        tree.generar_3d("!=", temp.toString(), der, "t" + tree.temp);
                        tree.tmpsop.push("t" + tree.temp);
                        tree.temp++;
                    }
                }
                else {
                    let temp1 = tree.tmpsop.pop();
                    let temp2 = tree.tmpsop.pop();
                    tree.generar_3d("!=", temp2.toString(), temp1.toString(), "t" + tree.temp);
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
            //debugger;
            if (this.derecha.type == null) {
                if (this.Operador == "<" || this.Operador == "<=" || this.Operador == ">" || this.Operador == ">=") {
                    this.derecha.type = new Types_1.Type(Types_1.types.NUMERIC);
                }
            }
            if (this.izquierda.type == null) {
                if (this.Operador == "<" || this.Operador == "<=" || this.Operador == ">" || this.Operador == ">=") {
                    this.izquierda.type = new Types_1.Type(Types_1.types.NUMERIC);
                }
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
