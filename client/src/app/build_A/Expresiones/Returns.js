"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Returns = void 0;
const Node_1 = require("../Abstract/Node");
const Types_1 = require("../util/Types");
/**
 * @class Nodo expresion break, nos indica cuando terminar un ciclo
 */
class Returns extends Node_1.Node {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     */
    constructor(expresion, line, column) {
        super(null, line, column, true);
        this.expresion = expresion;
    }
    execute(table, tree) {
        if (this.expresion == null) {
            this.type = new Types_1.Type(Types_1.types.VOID);
            this.value = null;
            return this;
        }
        else {
            let result = this.expresion.execute(table, tree);
            this.type = this.expresion.type;
            this.value = result;
            return this;
        }
        //return this;
    }
}
exports.Returns = Returns;
