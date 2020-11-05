"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametro = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Simbol_1 = require("../Simbols/Simbol");
class Parametro extends Node_1.Node {
    constructor(indentificador, tipo, line, column) {
        super(tipo, line, column, true);
        this.identifier = indentificador;
    }
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        /*this.parameters.forEach(element => {
          let simbol;
          simbol = new Simbol(this.type, this.identifier, null, true,null,null);
          const res = table.setVariable(simbol);
          if (res != null) {
              const error = new Error('Semantico', res, this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
              return error;
          }
          return null;
        });*/
        let simbol;
        simbol = new Simbol_1.Simbol(this.type, this.identifier, null, true, null, null);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Errors_1.Error('Semantico', res, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        return null;
    }
}
exports.Parametro = Parametro;
