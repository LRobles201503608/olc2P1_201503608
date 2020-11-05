"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficarTS = void 0;
const Node_1 = require("../Abstract/Node");
const Simbol_1 = require("../Simbols/Simbol");
const Table_1 = require("../Simbols/Table");
const Types_1 = require("../util/Types");
/*
* Esta clase imprime los ambientes
*/
class GraficarTS extends Node_1.Node {
    constructor(linea, col) {
        super(new Types_1.Type(Types_1.types.VOID), linea, col, true);
    }
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        let global = table;
        global = tree.globalofensive;
        //debugger;
        global.setVariable(new Simbol_1.Simbol(null, "global201503608", table, true, null, null));
        let entorno = table.getVariable("global201503608");
        if (entorno == null) {
        }
        else {
            let dato = entorno.value;
            console.log(dato);
            //debugger;
            let filas_e = "";
            if (dato instanceof Table_1.Table) {
                while (dato != null) {
                    if (dato.Previous == null) {
                        filas_e += "<tr ><td>ENTORNO GLOBAL</td></tr>";
                    }
                    else {
                        filas_e += "<tr ><td>ENTORNO ANTERIOR</td></tr>";
                    }
                    dato.Variables.forEach(element => {
                        if (element.identifier == "global201503608") {
                            //console.log(element);
                        }
                        else {
                            console.log(element);
                            console.log(element.type.type);
                            if (element.type != null) {
                                if (element.type.type == 0) {
                                    filas_e += "<tr ><td>Numeric</td>";
                                }
                                else if (element.type.type == 1) {
                                    filas_e += "<tr ><td>String</td>";
                                }
                                else if (element.type.type == 2) {
                                    filas_e += "<tr ><td>Boolean</td>";
                                }
                                else if (element.type.type == 3) {
                                    filas_e += "<tr ><td>Void</td>";
                                }
                                filas_e += "<td>" + element.identifier + "</td>" + "<td>" + element.value + "</td></tr>";
                            }
                        }
                    });
                    dato = dato.Previous;
                }
            }
            tree.repent.push(filas_e);
        }
        return null;
    }
}
exports.GraficarTS = GraficarTS;
