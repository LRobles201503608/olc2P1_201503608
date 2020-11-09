"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Primitivos_1 = require("../Expresiones/Primitivos");
/**
 * @class Reasigna el valor de una variable existente
 */
class Asignacion extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, value, line, column, editable) {
        super(null, line, column, editable);
        this.identifier = identifier;
        this.value = value;
    }
    traducir(tabla, tree, cadena, contTemp) {
        let a = this.value.traducir(tabla, tree, cadena, contTemp);
        let simbol = tabla.getVariable(this.identifier);
        //debugger;
        if (a instanceof Errors_1.Error) {
            return a;
        }
        console.log(tree);
        if (simbol.entorno == 0) {
            if (this.value instanceof Primitivos_1.Primitivos) {
                tree.generar_3d("", simbol.posh.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_heap("(int)" + posi.toString(), a.toString());
            }
            else {
                tree.generar_3d("", simbol.posh.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_heap("(int)" + posi.toString(), tree.tmpsop.pop().toString());
                tree.temp++;
            }
        }
        else {
            if (this.value instanceof Primitivos_1.Primitivos) {
                tree.generar_3d("", simbol.posh.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_stack("(int)" + posi.toString(), a.toString());
                tree.temp++;
            }
            else {
                tree.generar_3d("", simbol.poss.toString(), "", "t" + tree.temp);
                tree.tmpsop.push("t" + tree.temp);
                tree.temp++;
                //debugger;
                let posi = tree.tmpsop.pop();
                let stackk = tree.modificar_stack("(int)" + posi.toString(), tree.tmpsop.pop().toString());
                tree.temp++;
            }
        }
        return;
    }
    execute(table, tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Errors_1.Error) {
            return result;
        }
        let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.type == null) {
            if (this.value.type != null) {
                this.type = new Types_1.Type(this.value.type.type);
            }
            else {
                this.type = new Types_1.Type(Types_1.types.NUMERIC);
            }
            variable.value = result;
            return null;
        }
        if (this.value.type != null) {
            if (this.value.type.type != variable.type.type) {
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
        }
        variable.value = result;
        this.traducir(table, tree, "", 0);
        return null;
    }
}
exports.Asignacion = Asignacion;
