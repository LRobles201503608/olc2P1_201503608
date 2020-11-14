"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Cases_1 = require("./Cases");
const Default_1 = require("./Default");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class Switch extends Node_1.Node {
    /**
     * @constructor
     * @param condition
     *
     * @param List
     * @param line
     * @param column
     */
    constructor(condition, List, line, column) {
        super(null, line, column, true);
        this.condition = condition;
        this.List = List;
        this.column = column;
        this.line = line;
    }
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        let newtable = new Table_1.Table(table);
        table.hijos.push(newtable);
        let valcondi = this.condition.execute(newtable, tree);
        tree.generar_3d("", valcondi + "", "", "t" + tree.temp);
        let condi = "t" + tree.temp;
        tree.temp++;
        let lSalida = "L" + tree.etiqueta;
        tree.etiqueta++;
        let conteoEncuentra = 0;
        let funciona = 0;
        for (let a = 0; a < this.List.length; a++) {
            const element = this.List[a];
            if (element instanceof Cases_1.Cases) {
                let valcase = element.condition.execute(newtable, tree);
                tree.generar_3d("==", condi, valcase + "", "t" + tree.temp);
                let valcondicion = "t" + tree.temp;
                let lsi = "L" + tree.etiqueta;
                let lno = "L" + (tree.etiqueta + 1);
                //debugger;
                tree.generarIFC3D(valcondicion, "L" + tree.etiqueta, "L" + (tree.etiqueta + 1));
                tree.etiqueta = tree.etiqueta + 2;
                tree.traduccion.push(lsi + ":\n");
                if (valcondi == valcase && conteoEncuentra == 0) {
                    element.execute(newtable, tree);
                    conteoEncuentra++;
                    funciona++;
                    if (funciona == 1) {
                        tree.traduccion.push("goto " + lSalida + ";\n");
                    }
                }
                tree.traduccion.push(lno + ":\n");
            }
            else if (element instanceof Default_1.Default) {
                if (conteoEncuentra == 0) {
                    element.execute(newtable, tree);
                }
            }
        }
        if (funciona == 1) {
            tree.traduccion.push(lSalida + ":\n");
        }
    }
}
exports.Switch = Switch;
