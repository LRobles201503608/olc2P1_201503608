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
const Ternario_1 = require("./Ternario");
const Strings_1 = require("../Expresiones/Strings");
const StringToLower_1 = require("./StringToLower");
const StringToUpper_1 = require("./StringToUpper");
const CharAt_1 = require("./CharAt");
const Length_1 = require("./Length");
const Concat_1 = require("./Concat");
const AccessoDimensiones_1 = require("./AccessoDimensiones");
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
        let simbol = tabla.getVariable(this.identifier);
        //debugger;
        if (this.value instanceof Ternario_1.Ternario) {
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
        else if (this.value instanceof AccessoDimensiones_1.AccesoArrays) {
            debugger;
            if (simbol.entorno == 0) {
                let posh = tree.posh;
                let destino = tree.tmpsop.pop();
                tree.modificar_heap(posh.toString(), destino.toString());
                simbol.posh = posh;
                tree.posh += 25;
                simbol.type = new Types_1.Type(Types_1.types.NUMERIC);
                return;
            }
            else {
                let poss = tree.poss;
                let destino = tree.tmpsop.pop();
                tree.modificar_stack(poss.toString(), destino.toString());
                simbol.poss = poss;
                tree.poss += 25;
                simbol.type = new Types_1.Type(Types_1.types.NUMERIC);
                return;
            }
        }
        else {
            let a = this.value.traducir(tabla, tree, cadena, contTemp);
            if (a instanceof Errors_1.Error) {
                return a;
            }
            if (this.value instanceof Aritmeticas_1.Aritmetica || this.value instanceof Relacional_1.Relacional || this.value instanceof Logicas_1.Logica) {
                if (simbol.entorno == 0) {
                    let posh = tree.posh;
                    let destino = tree.tmpsop.pop();
                    tree.modificar_heap(posh.toString(), destino.toString());
                    simbol.posh = posh;
                    simbol.iniciostring = tree.inicioStringHeap;
                    simbol.finstring = tree.finStringHeap - 1;
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
                    debugger;
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
            else if (this.value instanceof Strings_1.Strings || this.value instanceof StringToLower_1.LowerCase || this.value instanceof StringToUpper_1.UpperCase || this.value instanceof CharAt_1.CharAt || this.value instanceof Concat_1.Concat) {
                if (this.value instanceof Concat_1.Concat) {
                    let val = this.value.execute(tabla, tree) + "";
                    let inicio = tree.inicioStringHeap;
                    let fin = inicio;
                    for (let a = 0; a < val.length; a++) {
                        let act = val.charCodeAt(a);
                        let sigval = val.charCodeAt(a + 1);
                        if (act == 92) {
                            if (sigval == 110) {
                                act = 10;
                                a++;
                            }
                            else if (sigval == 116) {
                                act = 9;
                                a++;
                            }
                            else if (sigval == 114) {
                                act = 13;
                                a++;
                            }
                        }
                        tree.modificar_heap(fin.toString(), act.toString());
                        fin++;
                    }
                    tree.finStringHeap = fin;
                }
                else if (this.value instanceof CharAt_1.CharAt) {
                    let val = this.value.execute(tabla, tree) + "";
                    let val2 = val.charCodeAt(0);
                    tree.generar_3d("", val2.toString(), "", "t" + tree.temp);
                    tree.modificar_heap(tree.posh + "", "t" + tree.temp);
                    simbol.iniciostring = tree.posh;
                    simbol.finstring = tree.posh;
                    tree.posh += 200;
                    tree.temp++;
                    return;
                }
                simbol.iniciostring = tree.inicioStringHeap;
                simbol.finstring = tree.finStringHeap;
                simbol.type = new Types_1.Type(Types_1.types.STRING);
            }
            else if (this.value instanceof Length_1.Lengths) {
                debugger;
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
                    if (this.value instanceof Strings_1.Strings || this.value instanceof StringToLower_1.LowerCase || this.value instanceof StringToUpper_1.UpperCase || this.value instanceof CharAt_1.CharAt) {
                        this.type = new Types_1.Type(Types_1.types.STRING);
                    }
                    else {
                        this.type = new Types_1.Type(Types_1.types.NUMERIC);
                    }
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
