"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignaArrays = void 0;
const Node_1 = require("../Abstract/Node");
const Errors_1 = require("../util/Errors");
/**
 * @class Reasigna el valor de una variable existente
 */
class AsignaArrays extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier, value, expre, line, column, editable) {
        super(null, line, column, editable);
        this.dimenLaMamalona = 0;
        this.identifier = identifier;
        this.value = value;
        this.expre = expre;
    }
    traducir(tabla, tree, cadena, contTemp) {
        let variable;
        variable = tabla.getVariable(this.identifier);
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let repos = 0;
        let newdimen = 0;
        if (this.dimenLaMamalona == 1) {
            let posi = variable.iniciostring;
            let pos = posi + this.value[0].execute(tabla, tree);
            let val = this.expre.execute(tabla, tree);
            tree.modificar_heap(pos, val);
        }
        else if (this.dimenLaMamalona == 2) {
        }
        else if (this.dimenLaMamalona == 3) {
        }
    }
    execute(table, tree) {
        //console.log(this.expre);
        //console.log(this.value);
        let variable;
        variable = table.getVariable(this.identifier);
        //debugger;
        if (variable == null) {
            const error = new Errors_1.Error('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let tam = this.value.length;
        let valor = variable.value;
        if (tam == 1) {
            this.dimenLaMamalona = 1;
            this.traducir(table, tree, "", 0);
            valor[this.value[0].execute(table, tree)] = this.expre.execute(table, tree);
        }
        if (tam == 2) {
            this.dimenLaMamalona = 2;
            this.traducir(table, tree, "", 0);
            valor[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)] = this.expre.execute(table, tree);
        }
        if (tam == 3) {
            this.dimenLaMamalona = 3;
            this.traducir(table, tree, "", 0);
            valor[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)] = this.expre.execute(table, tree);
        }
        if (tam == 4) {
            valor[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)] = this.expre.execute(table, tree);
        }
        if (tam == 5) {
            valor[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)][this.value[4].execute(table, tree)] = this.expre.execute(table, tree);
        }
        if (tam == 6) {
            valor[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)][this.value[4].execute(table, tree)][this.value[5].execute(table, tree)] = this.expre.execute(table, tree);
        }
        if (tam == 7) {
            valor[this.value[0].execute(table, tree)][this.value[1].execute(table, tree)][this.value[2].execute(table, tree)][this.value[3].execute(table, tree)][this.value[4].execute(table, tree)][this.value[5].execute(table, tree)][this.value[6].execute(table, tree)] = this.expre.execute(table, tree);
        }
    }
}
exports.AsignaArrays = AsignaArrays;
