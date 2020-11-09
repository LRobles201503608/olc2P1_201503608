"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrays = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Simbol_1 = require("../Simbols/Simbol");
const Primitivos_1 = require("../Expresiones/Primitivos");
const Identifier_1 = require("../Expresiones/Identifier");
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Arrays extends Node_1.Node {
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
        this.guardaditoHiperChingon = [];
        this.identifier = identifier;
        this.value = value;
        this.edit = editable;
    }
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        this.llenadoArreglo(table, tree, this.value);
        let simbol;
        simbol = new Simbol_1.Simbol(this.type, this.identifier, this.guardaditoHiperChingon, this.edit, null, null, this.linea, this.columna);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Errors_1.Error('Semantico', res, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
        }
    }
    llenadoArreglo(table, tree, value) {
        for (let a = 0; a < this.value.length; a++) {
            const element = value[a];
            if (element instanceof Primitivos_1.Primitivos || element instanceof Identifier_1.Identifier) {
                let val = element.execute(table, tree);
                this.guardaditoHiperChingon.push(val);
                //console.log(this.guardaditoHiperChingon);
            }
            else {
                let arre = [];
                for (let b = 0; b < element.length; b++) {
                    const element2 = element[b];
                    if (element2 instanceof Primitivos_1.Primitivos || element2 instanceof Identifier_1.Identifier) {
                        arre.push(element2.execute(table, tree));
                        //console.log(arre);
                    }
                    else {
                        let arre2 = [];
                        for (let c = 0; c < element2.length; c++) {
                            const element3 = element2[c];
                            if (element3 instanceof Primitivos_1.Primitivos || element3 instanceof Identifier_1.Identifier) {
                                arre2.push(element3.execute(table, tree));
                                //console.log(arre2);
                            }
                            else {
                                let arre3 = [];
                                for (let d = 0; d < element3.length; d++) {
                                    const element4 = element3[d];
                                    if (element4 instanceof Primitivos_1.Primitivos || element4 instanceof Identifier_1.Identifier) {
                                        arre3.push(element4.execute(table, tree));
                                        //console.log(arre3);
                                    }
                                    else {
                                        let arre4 = [];
                                        for (let e = 0; e < element4.length; e++) {
                                            const element5 = element4[e];
                                            if (element5 instanceof Primitivos_1.Primitivos || element5 instanceof Identifier_1.Identifier) {
                                                arre4.push(element5.execute(table, tree));
                                                //console.log(arre4);
                                            }
                                            else {
                                                let arre5 = [];
                                                for (let f = 0; f < element5.length; f++) {
                                                    const element6 = element5[f];
                                                    if (element6 instanceof Primitivos_1.Primitivos || element6 instanceof Identifier_1.Identifier) {
                                                        arre5.push(element6.execute(table, tree));
                                                        //console.log(arre4);
                                                    }
                                                    else {
                                                        let arre6 = [];
                                                        for (let g = 0; g < element6.length; g++) {
                                                            const element7 = element6[g];
                                                            if (element7 instanceof Primitivos_1.Primitivos || element7 instanceof Identifier_1.Identifier) {
                                                                arre6.push(element7.execute(table, tree));
                                                                //console.log(arre4);
                                                            }
                                                        }
                                                        arre5.push(arre6);
                                                    }
                                                }
                                                arre4.push(arre5);
                                            }
                                        }
                                        arre3.push(arre4);
                                    }
                                }
                                arre2.push(arre3);
                            }
                        }
                        arre.push(arre2);
                    }
                }
                this.guardaditoHiperChingon.push(arre);
            }
            console.log(this.guardaditoHiperChingon);
        }
    }
}
exports.Arrays = Arrays;
