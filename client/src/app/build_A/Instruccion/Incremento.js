"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
/**
 * @class Reasigna el valor de una variable existente
 */
class Incremento extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Incremento
     * @param identifier nombre de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, line, column, editable) {
        super(null, line, column, editable);
        this.identifier = identifier;
    }
    traducir(tabla, tree, cadena, contTemp) {
        let variable;
        variable = tabla.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se puede encontrar la variable', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.entorno == 0) {
            let value = tree.obtener_Heap(variable.posh.toString(), "t" + tree.temp);
            tree.temp++;
            let a = tree.generar_3d("+", value.toString(), "1", "t" + tree.temp);
            tree.tmpsop.push("t" + tree.temp);
            let b = tree.tmpsop.pop();
            tree.modificar_heap(variable.posh.toString(), b.toString());
            tree.temp++;
            return a;
        }
        else {
            let value = tree.obtener_stack(variable.poss.toString(), "t" + tree.temp);
            tree.temp++;
            let a = tree.generar_3d("+", value.toString(), "1", "t" + tree.temp);
            tree.tmpsop.push("t" + tree.temp);
            let b = tree.tmpsop.pop();
            tree.modificar_stack(variable.poss.toString(), b.toString());
            tree.temp++;
            return a;
        }
    }
    execute(table, tree) {
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.type.type == null) {
            variable.type.type = Types_1.types.NUMERIC;
            return null;
        }
        if (variable.type.type != Types_1.types.NUMERIC) {
            const error = new Errors_1.Error('Semantico', `No se puede asignar la variable porque los tipos no coinciden.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.editable == false) {
            const error = new Errors_1.Error('Semantico', `No se puede asignar a la variable porque es una constante.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        variable.value = Number(variable.value) + 1;
        this.traducir(table, tree, "", 0);
        return variable.value;
    }
}
exports.Incremento = Incremento;
