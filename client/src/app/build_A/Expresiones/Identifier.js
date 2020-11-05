"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
const Errors_1 = require("../util/Errors");
const Node_1 = require("../Abstract/Node");
class Identifier extends Node_1.Node {
    constructor(iden, linea, columna, editable) {
        super(null, linea, columna, editable); // no se le agrega un tipo porque aun no lo tiene
        this.iden = iden;
    }
    traducir(tabla, tree, cadena, contTemp) {
        let variable;
        variable = tabla.getVariable(this.iden);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se puede encontrar la variable', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.entorno == 0) {
            let value = tree.obtener_Heap(variable.posh.toString(), "t" + tree.temp);
            tree.temp++;
            return value;
        }
        else {
            let value = tree.obtener_stack(variable.poss.toString(), "t" + tree.temp);
            tree.temp++;
            return value;
        }
    }
    execute(table, tree) {
        let variable;
        variable = table.getVariable(this.iden);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se puede encontrar la variable', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        this.type = variable.type;
        return variable.value;
    }
}
exports.Identifier = Identifier;
