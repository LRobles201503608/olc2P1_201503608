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
    traducir(tabla, tree, cadena, contTemp) {
    }
    execute(table, tree) {
        if (this.expresion == null) {
            // cuando no viene una expresion me regresa un void
            this.type = new Types_1.Type(Types_1.types.VOID);
            // tampoco tiene valor porque no tiene una expresion
            this.value = null;
            //retornamos la instacia de la clase
            return this;
        }
        else {
            //lo mismo de arriba pero este si trae tipo y trae valor :v
            let result = this.expresion.execute(table, tree);
            this.type = this.expresion.type;
            this.value = result; // el valor :v
            return this;
        }
        //return this;
    }
}
exports.Returns = Returns;
