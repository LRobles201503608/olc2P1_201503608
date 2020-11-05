"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funciones = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Errors_1 = require("../util/Errors");
const Simbol_1 = require("../Simbols/Simbol");
class Funciones extends Node_1.Node {
    constructor(indentificador, tipo, parametros, instrucciones, line, column) {
        super(tipo, line, column, true);
        this.identifier = indentificador;
        this.parameters = parametros;
        this.instructions = instrucciones;
    }
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        let simbol;
        const newtable = new Table_1.Table(table);
        simbol = new Simbol_1.Simbol(this.type, this.identifier, null, true, this.instructions, this.parameters);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Errors_1.Error('Semantico', res, this.linea, this.columna);
            tree.errores.push(error);
            //tree.console.push(error.toString());
            return error;
        }
        if (this.parameters != null) {
            this.parameters.forEach(element => {
                element.execute(newtable, tree);
            });
            console.log("HOLIIIIIIIIIIIIIIIII");
            //console.log(newtable);
        }
        return null;
    }
}
exports.Funciones = Funciones;
