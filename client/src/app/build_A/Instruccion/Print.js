"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
const Node_1 = require("../Abstract/Node");
const Aritmeticas_1 = require("../Expresiones/Aritmeticas");
const Identifier_1 = require("../Expresiones/Identifier");
const Logicas_1 = require("../Expresiones/Logicas");
const Relacional_1 = require("../Expresiones/Relacional");
const Strings_1 = require("../Expresiones/Strings");
const Types_1 = require("../util/Types");
const CharAt_1 = require("./CharAt");
const Concat_1 = require("./Concat");
const Length_1 = require("./Length");
/*
* Impresion de las expresiones/variables/etc. en consola
*/
class print extends Node_1.Node {
    constructor(expresion, linea, col) {
        super(new Types_1.Type(Types_1.types.VOID), linea, col, true);
        this.expresion = expresion;
    }
    traducir(tabla, tree, cadena, contTemp) {
        if (this.expresion instanceof Aritmeticas_1.Aritmetica || this.expresion instanceof Logicas_1.Logica || this.expresion instanceof Relacional_1.Relacional) {
            let value2 = this.expresion.execute(tabla, tree) + "";
            debugger;
            let val = value2.toString();
            let inicio = 0;
            let final = 0;
            for (let a = 0; a < val.length; a++) {
                if (a == 0) {
                    tree.inicioStringHeap = tree.posh;
                    inicio = tree.inicioStringHeap;
                    let valu = val.charCodeAt(a);
                    let sigval = val.charCodeAt(a + 1);
                    if (valu == 92) {
                        if (sigval == 110) {
                            valu = 10;
                            a++;
                        }
                        else if (sigval == 116) {
                            valu = 9;
                            a++;
                        }
                        else if (sigval == 114) {
                            valu = 13;
                            a++;
                        }
                    }
                    tree.modificar_heap(inicio.toString(), valu.toString());
                    tree.traduccion.push("printf(\"%c\",(char)heap[" + inicio + "]);\n");
                    tree.posh++;
                }
                else if (a == val.length - 1) {
                    tree.finStringHeap = tree.posh;
                    final = tree.finStringHeap;
                    let valu = val.charCodeAt(a);
                    tree.modificar_heap(final.toString(), valu.toString());
                    tree.traduccion.push("printf(\"%c\",(char)heap[" + final + "]);\n");
                    tree.traduccion.push("printf(\"%c\",(char)10);\n");
                    tree.posh += 350;
                }
                else {
                    let valu = val.charCodeAt(a);
                    let sigval = val.charCodeAt(a + 1);
                    if (valu == 92) {
                        if (sigval == 110) {
                            valu = 10;
                            a++;
                        }
                        else if (sigval == 116) {
                            valu = 9;
                            a++;
                        }
                        else if (sigval == 114) {
                            valu = 13;
                            a++;
                        }
                    }
                    tree.modificar_heap(tree.posh.toString(), valu.toString());
                    tree.traduccion.push("printf(\"%c\",(char)heap[" + tree.posh + "]);\n");
                    tree.posh++;
                }
            }
        }
        else if (this.expresion instanceof Identifier_1.Identifier) {
            debugger;
            let variable;
            variable = tabla.getVariable(this.expresion.iden);
            if (variable.type == null) {
                debugger;
                tree.traduccion.push("printf(\"%f\",(float)" + variable.value + ");\n");
                tree.traduccion.push("printf(\"%c\",(char)10);\n");
                return;
            }
            if (variable.type.type == Types_1.types.NUMERIC) {
                let values = this.expresion.traducir(tabla, tree, "", 0);
                tree.traduccion.push("printf(\"%f\",(float)" + values + ");\n");
            }
            else if (variable.type.type == Types_1.types.BOOLEAN) {
                let values = this.expresion.traducir(tabla, tree, "", 0);
                tree.traduccion.push("printf(\"%d\",(int)" + values + ");\n");
            }
            else if (variable.type.type == Types_1.types.STRING) {
                let val = variable.value + "";
                let inicio = 0;
                let final = 0;
                for (let a = 0; a < val.length; a++) {
                    if (a == 0) {
                        tree.inicioStringHeap = tree.posh;
                        inicio = tree.inicioStringHeap;
                        let valu = val.charCodeAt(a);
                        let sigval = val.charCodeAt(a + 1);
                        if (valu == 92) {
                            if (sigval == 110) {
                                valu = 10;
                                a++;
                            }
                            else if (sigval == 116) {
                                valu = 9;
                                a++;
                            }
                            else if (sigval == 114) {
                                valu = 13;
                                a++;
                            }
                        }
                        tree.modificar_heap(inicio.toString(), valu.toString());
                        tree.traduccion.push("printf(\"%c\",(char)heap[" + inicio + "]);\n");
                        tree.posh++;
                    }
                    else if (a == val.length - 1) {
                        tree.finStringHeap = tree.posh;
                        final = tree.finStringHeap;
                        let valu = val.charCodeAt(a);
                        tree.modificar_heap(final.toString(), valu.toString());
                        tree.traduccion.push("printf(\"%c\",(char)heap[" + final + "]);\n");
                        tree.traduccion.push("printf(\"%c\",(char)10);\n");
                        tree.posh += 350;
                    }
                    else {
                        let valu = val.charCodeAt(a);
                        let sigval = val.charCodeAt(a + 1);
                        if (valu == 92) {
                            if (sigval == 110) {
                                valu = 10;
                                a++;
                            }
                            else if (sigval == 116) {
                                valu = 9;
                                a++;
                            }
                            else if (sigval == 114) {
                                valu = 13;
                                a++;
                            }
                        }
                        tree.modificar_heap(tree.posh.toString(), valu.toString());
                        tree.traduccion.push("printf(\"%c\",(char)heap[" + tree.posh + "]);\n");
                        tree.posh++;
                    }
                }
            }
        }
        else if (this.expresion instanceof Strings_1.Strings) {
            let val = this.expresion.traducir(tabla, tree, "", 0);
            let inicio = tree.inicioStringHeap;
            let fin = tree.finStringHeap;
            for (let a = inicio; a <= fin; a++) {
                let value = tree.obtener_Heap(a.toString(), "t" + tree.temp);
                tree.temp++;
                tree.traduccion.push("printf(\"%c\",(char)" + value + ");\n");
            }
        }
        else if (this.expresion instanceof Length_1.Lengths) {
            let val = this.expresion.execute(tabla, tree);
            tree.traduccion.push("printf(\"%d\",(int)" + val + ");\n");
        }
        else if (this.expresion instanceof Concat_1.Concat) {
            let variable;
            variable = tabla.getVariable(this.expresion.identifier);
            try {
                let inicio = 0;
                let fin = 0;
                inicio = variable.iniciostring;
                fin = variable.finstring;
                let val = this.expresion.execute(tabla, tree) + "";
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
                for (let a = inicio; a < fin; a++) {
                    tree.traduccion.push("printf(\"%c\",(char)heap[" + a + "]);\n");
                }
                tree.traduccion.push("printf(\"%c\",(char)10);\n");
            }
            catch (ex) {
            }
        }
        else if (this.expresion instanceof CharAt_1.CharAt) {
            let val = this.expresion.execute(tabla, tree) + "";
            let val2 = val.charCodeAt(0);
            tree.traduccion.push("printf(\"%c\",(char)" + val2 + ");\n");
            tree.traduccion.push("printf(\"%c\",(char)10);\n");
        }
    }
    // metodo de ejecucion que pertenece a la clase PRINT
    execute(table, tree) {
        if (String(this.expresion) == "\\n") {
            tree.console.push("\\n");
            return null;
        }
        const value = this.expresion.execute(table, tree);
        tree.console.push(value);
        this.traducir(table, tree, "", 0);
        return null;
    }
}
exports.print = print;
