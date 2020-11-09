"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cases = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class Cases extends Node_1.Node {
    /**
     * @constructor
     * @param declaracion nodo de declaraciones
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
        let newtable;
        for (let i = 0; i < this.List.length; i++) {
            newtable = new Table_1.Table(table);
            table.hijos.push(newtable);
            const res = this.List[i].execute(newtable, tree);
            if (res instanceof Continue_1.Continue) {
                break;
            }
            else if (res instanceof Break_1.Break) {
                return;
            }
        }
    }
}
exports.Cases = Cases;
