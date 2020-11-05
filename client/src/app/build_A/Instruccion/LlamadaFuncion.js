"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaFuncion = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Errors_1 = require("../util/Errors");
const Simbol_1 = require("../Simbols/Simbol");
const Returns_1 = require("../Expresiones/Returns");
class LlamadaFuncion extends Node_1.Node {
    constructor(indentificador, parametros, line, column) {
        super(null, line, column, true);
        this.identifier = indentificador;
        this.parameters = parametros;
    }
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        //asignaciones de valores a los parametros, si viene nulo no hace nada
        let entorno = table.getVariable(this.identifier);
        //console.log(this.parameters);
        //console.log(entorno);
        //debugger;
        const newtable = new Table_1.Table(tree.globalofensive);
        //debugger;
        if (this.parameters == null || entorno.parameters == null) {
        }
        else {
            if (this.parameters.length == entorno.parameters.length) {
                for (let a = entorno.parameters.length - 1; a >= 0; a--) {
                    let tamanio = entorno.parameters.length;
                    let result;
                    if (this.parameters != null) {
                        //debugger;
                        result = this.parameters[tamanio - (a + 1)].execute(table, tree);
                    }
                    else {
                        result = null;
                    }
                    if (result instanceof Errors_1.Error) {
                        return result;
                    }
                    let simbol;
                    if (entorno.parameters[a].type != null) {
                        simbol = new Simbol_1.Simbol(entorno.parameters[a].type, entorno.parameters[a].identifier, result, true, null, null);
                    }
                    else {
                        simbol = new Simbol_1.Simbol(null, entorno.parameters[a].identifier, result, true, null, null);
                    }
                    const res = newtable.setVariable(simbol);
                    if (res != null) {
                        const error = new Errors_1.Error('Semantico', res, this.linea, this.columna);
                        tree.errores.push(error);
                        tree.console.push(error.toString());
                    }
                }
            }
            else {
                const error = new Errors_1.Error('Semantico', `Funcion encontrada pero con parametros distintos.`, this.linea, this.columna);
                tree.errores.push(error);
                return error;
            }
        }
        //console.log(entorno);
        if (entorno == null) {
            const error = new Errors_1.Error('Semantico', `No se puede encontrar la funcion.`, this.linea, this.columna);
            tree.errores.push(error);
            return error;
        }
        let instructions = entorno.insfunc;
        //const newtable= new Table(table);
        if (instructions == null) {
        }
        else {
            let contadorreturn = 0;
            let resultado;
            //debugger;
            for (let x = 0; x < instructions.length; x++) {
                //debugger;
                const element = instructions[x];
                //console.log(element);
                //debugger;
                if (element instanceof Returns_1.Returns) {
                    resultado = element.expresion.execute(newtable, tree);
                    //debugger;
                    this.type = resultado.type;
                    return resultado;
                }
                let a = element.execute(newtable, tree);
                if (a instanceof Returns_1.Returns) {
                    //debugger;
                    this.type = a.type;
                    //console.log("funciona mierda funciona "+a.value);
                    return a.value;
                }
            }
        }
    }
}
exports.LlamadaFuncion = LlamadaFuncion;
