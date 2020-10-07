"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForOf = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Simbol_1 = require("../Simbols/Simbol");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class ForOf extends Node_1.Node {
    /**
     * @constructor
     * @param declaracion nodo de declaraciones
     * @param condition
     *
     * @param List
     * @param line
     * @param column
     */
    constructor(declaracion, condition, List, line, column) {
        super(null, line, column, true);
        this.declaracion = declaracion;
        this.condition = condition;
        this.List = List;
        this.column = column;
        this.line = line;
    }
    execute(table, tree) {
        let newtable = new Table_1.Table(table);
        let simbol;
        simbol = new Simbol_1.Simbol(new Types_1.Type(Types_1.types.NUMERIC), this.declaracion, null, true, null, null);
        const res = newtable.setVariable(simbol);
        if (res != null) {
            const error = new Errors_1.Error('Semantico', res, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
        }
        let variable;
        variable = newtable.getVariable(this.condition);
        let simval = simbol.value;
        let varval = variable.value;
        let newtable2;
        debugger;
        for (simval of varval) {
            simbol.value = simval;
            newtable2 = new Table_1.Table(newtable);
            for (let i = 0; i < this.List.length; i++) {
                if (String(this.List[i]) == ";") {
                }
                else {
                    const res = this.List[i].execute(newtable2, tree);
                    if (res instanceof Continue_1.Continue) {
                        break;
                    }
                    else if (res instanceof Break_1.Break) {
                        return;
                    }
                }
            }
        }
    }
}
exports.ForOf = ForOf;
