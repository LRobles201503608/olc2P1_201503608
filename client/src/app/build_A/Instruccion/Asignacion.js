"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Primitivos_1 = require("../Expresiones/Primitivos");
const Strings_1 = require("../Expresiones/Strings");
const StringToLower_1 = require("./StringToLower");
const StringToUpper_1 = require("./StringToUpper");
const CharAt_1 = require("./CharAt");
const Concat_1 = require("./Concat");
const Length_1 = require("./Length");
const Ternario_1 = require("./Ternario");
const AccessoDimensiones_1 = require("./AccessoDimensiones");
/**
 * @class Reasigna el valor de una variable existente
 */
class Asignacion extends Node_1.Node {
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
        let a = this.value.traducir(tabla, tree, cadena, contTemp);
        let simbol = tabla.getVariable(this.identifier);
        //debugger;
        if (a instanceof Errors_1.Error) {
            return a;
        }
        if (this.value instanceof Ternario_1.Ternario) {
            debugger;
            if (simbol.entorno == 0) {
                let posh = simbol.posh;
                let destino = tree.tmpsop.pop();
                tree.modificar_heap(posh.toString(), destino.toString());
                simbol.posh = posh;
                return;
            }
            else {
                let poss = simbol.poss;
                let destino = tree.tmpsop.pop();
                tree.modificar_stack(poss.toString(), destino.toString());
                simbol.poss = poss;
                return;
            }
        }
        else if (this.value instanceof AccessoDimensiones_1.AccesoArrays) {
            debugger;
            if (simbol.entorno == 0) {
                let posh = simbol.posh;
                let destino = tree.tmpsop.pop();
                tree.modificar_heap(posh.toString(), destino.toString());
                simbol.posh = posh;
                simbol.type = new Types_1.Type(Types_1.types.NUMERIC);
                return;
            }
        }
        if (simbol.entorno == 0) {
            if (this.value instanceof Ternario_1.Ternario) {
                if (simbol.entorno == 0) {
                    let posh = simbol.posh;
                    let destino = tree.tmpsop.pop();
                    tree.modificar_heap(posh.toString(), destino.toString());
                    simbol.posh = posh;
                }
                else {
                    let poss = simbol.poss;
                    let destino = tree.tmpsop.pop();
                    tree.modificar_stack(poss.toString(), destino.toString());
                    simbol.poss = poss;
                }
            }
            else if (this.value instanceof Primitivos_1.Primitivos) {
                tree.generar_3d("", simbol.posh.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_heap("(int)" + posi.toString(), a.toString());
            }
            else if (this.value instanceof Strings_1.Strings || this.value instanceof StringToLower_1.LowerCase || this.value instanceof StringToUpper_1.UpperCase || this.value instanceof CharAt_1.CharAt || this.value instanceof Concat_1.Concat) {
                let fin = simbol.finstring;
                if (this.value instanceof Concat_1.Concat) {
                    let val = this.value.execute(tabla, tree) + "";
                    let inicio = simbol.iniciostring;
                    fin = inicio;
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
                    simbol.finstring = fin;
                    simbol.type = new Types_1.Type(Types_1.types.STRING);
                }
                else if (this.value instanceof CharAt_1.CharAt) {
                    let val = this.value.execute(tabla, tree) + "";
                    let val2 = val.charCodeAt(0);
                    tree.generar_3d("", val2.toString(), "", "t" + tree.temp);
                    tree.modificar_heap(tree.posh + "", "t" + tree.temp);
                    tree.temp++;
                    return;
                }
            }
            else if (this.value instanceof Length_1.Lengths) {
                debugger;
                if (simbol.entorno == 0) {
                    let posh = simbol.posh;
                    let destino = this.value.traducir(tabla, tree, cadena, contTemp);
                    tree.modificar_heap(posh.toString(), destino + "");
                    simbol.posh = posh;
                }
            }
            else {
                simbol.iniciostring = tree.inicioStringHeap;
                simbol.finstring = tree.finStringHeap;
                tree.generar_3d("", simbol.posh.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_heap("(int)" + posi.toString(), tree.tmpsop.pop().toString());
                tree.temp++;
            }
        }
        else {
            if (this.value instanceof Ternario_1.Ternario) {
                if (simbol.entorno == 0) {
                    let posh = simbol.posh;
                    let destino = tree.tmpsop.pop();
                    tree.modificar_heap(posh.toString(), destino.toString());
                    simbol.posh = posh;
                }
                else {
                    let poss = simbol.poss;
                    let destino = tree.tmpsop.pop();
                    tree.modificar_stack(poss.toString(), destino.toString());
                    simbol.poss = poss;
                }
            }
            else if (this.value instanceof Primitivos_1.Primitivos) {
                tree.generar_3d("", simbol.posh.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_stack("(int)" + posi.toString(), a.toString());
                tree.temp++;
            }
            else if (this.value instanceof Strings_1.Strings || this.value instanceof StringToLower_1.LowerCase || this.value instanceof StringToUpper_1.UpperCase || this.value instanceof CharAt_1.CharAt || this.value instanceof Concat_1.Concat) {
                let fin = simbol.finstring;
                if (this.value instanceof Concat_1.Concat) {
                    let val = this.value.execute(tabla, tree) + "";
                    let inicio = simbol.iniciostring;
                    fin = inicio;
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
                    simbol.finstring = fin;
                    simbol.type = new Types_1.Type(Types_1.types.STRING);
                }
                else if (this.value instanceof CharAt_1.CharAt) {
                    let val = this.value.execute(tabla, tree) + "";
                    let val2 = val.charCodeAt(0);
                    tree.generar_3d("", val2.toString(), "", "t" + tree.temp);
                    tree.modificar_heap(tree.posh + "", "t" + tree.temp);
                    tree.temp++;
                    return;
                }
            }
            else if (this.value instanceof Length_1.Lengths) {
                debugger;
                if (simbol.entorno == 0) {
                    let posh = simbol.posh;
                    let destino = this.value.traducir(tabla, tree, cadena, contTemp);
                    tree.modificar_heap(posh.toString(), destino + "");
                    simbol.posh = posh;
                }
            }
            else {
                simbol.iniciostring = tree.inicioStringHeap;
                simbol.finstring = tree.finStringHeap;
                tree.generar_3d("", simbol.poss.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_stack("(int)" + posi.toString(), tree.tmpsop.pop().toString());
                tree.temp++;
            }
        }
        return;
    }
    execute(table, tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Errors_1.Error) {
            return result;
        }
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.type == null) {
            if (this.value.type != null) {
                this.type = new Types_1.Type(this.value.type.type);
            }
            else {
                this.type = new Types_1.Type(Types_1.types.NUMERIC);
            }
            variable.value = result;
            return null;
        }
        if (this.value.type != null) {
            if (this.value.type.type != variable.type.type) {
                const error = new Errors_1.Error('Semantico', `No se puede asignar la variable porque los tipos no coinciden.`, this.linea, this.columna);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (variable.editable == false) {
                const error = new Errors_1.Error('Semantico', `No se puede asignar a la variable porque es una constante.`, this.linea, this.columna);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
        }
        variable.value = result;
        this.traducir(table, tree, "", 0);
        return null;
    }
}
exports.Asignacion = Asignacion;
