"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Simbol_1 = require("../Simbols/Simbol");
const Aritmeticas_1 = require("../Expresiones/Aritmeticas");
const Relacional_1 = require("../Expresiones/Relacional");
const Logicas_1 = require("../Expresiones/Logicas");
const Primitivos_1 = require("../Expresiones/Primitivos");
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
    traducir(tabla, tree, cadena, contTemp) {
        //debugger;
        let a = this.value.traducir(tabla, tree, cadena, contTemp);
        let simbol = tabla.getVariable(this.identifier);
        if (a instanceof Errors_1.Error) {
            return a;
        }
        if (this.value instanceof Aritmeticas_1.Aritmetica || this.value instanceof Relacional_1.Relacional || this.value instanceof Logicas_1.Logica) {
            if (simbol.entorno == 0) {
                let posh = tree.posh;
                let destino = tree.tmpsop.pop();
                tree.modificar_heap(posh.toString(), destino.toString());
                simbol.posh = posh;
                tree.posh += 250;
            }
            else {
                let poss = tree.poss;
                let destino = tree.tmpsop.pop();
                tree.modificar_stack(poss.toString(), destino.toString());
                simbol.poss = poss;
                tree.poss += 250;
            }
        }
        else if (this.value instanceof Primitivos_1.Primitivos) {
            if (simbol.entorno == 0) {
                let posh = tree.posh;
                let destino = this.value.traducir(tabla, tree, cadena, contTemp);
                tree.modificar_heap(posh.toString(), destino.toString());
                simbol.posh = posh;
                tree.posh += 250;
            }
            else {
                let poss = tree.poss;
                let destino = this.value.traducir(tabla, tree, cadena, contTemp);
                tree.modificar_stack(poss.toString(), destino.toString());
                simbol.poss = poss;
                tree.poss += 250;
            }
        }
        return;
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
        simbol = new Simbol_1.Simbol(this.type, this.identifier, result, this.edit, null, null, this.linea, this.columna);
        let global = tree.globalofensive;
        if (table == global) {
            simbol.entorno = 0;
        }
        else {
            simbol.entorno = 1;
        }
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Errors_1.Error('Semantico', res, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
        }
        this.traducir(table, tree, "", 0);
        return null;
    }
}
exports.Declaracion = Declaracion;
