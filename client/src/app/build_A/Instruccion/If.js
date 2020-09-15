"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class If extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param IfList Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param ElseList Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(condition, IfList, ElseList, line, column) {
        super(null, line, column, true);
        this.condition = condition;
        this.IfList = IfList;
        this.ElseList = ElseList;
        this.linea = line;
        this.columna = column;
    }
    execute(table, tree) {
        const newtable = new Table_1.Table(table);
        let result;
        result = this.condition.execute(newtable, tree);
        if (result instanceof Errors_1.Error) {
            return result;
        }
        if (this.condition.type.type !== Types_1.types.BOOLEAN) {
            const error = new Errors_1.Error('Semantico', 'Se esperaba una expresion de tipo booleana no encontrada', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (result) {
            for (let i = 0; i < this.IfList.length; i++) {
                const res = this.IfList[i].execute(newtable, tree);
                if (res instanceof Continue_1.Continue || res instanceof Break_1.Break) {
                    return res;
                }
            }
        }
        else {
            for (let i = 0; i < this.ElseList.length; i++) {
                const res = this.ElseList[i].execute(newtable, tree);
                if (res instanceof Continue_1.Continue || res instanceof Break_1.Break) {
                    return res;
                }
            }
        }
        return null;
    }
}
exports.If = If;
