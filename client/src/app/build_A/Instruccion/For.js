"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Declaracion_1 = require("./Declaracion");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class For extends Node_1.Node {
    /**
     * @constructor
     * @param declaracion nodo de declaraciones
     * @param condition
     *
     * @param List
     * @param line
     * @param column
     */
    constructor(declaracion, expresiondecla, condition, asignacion, List, line, column) {
        super(null, line, column, true);
        this.declaracion = declaracion;
        this.condition = condition;
        this.asignacion = asignacion;
        this.List = List;
        this.column = column;
        this.line = line;
        this.expresiondecla = expresiondecla;
    }
    execute(table, tree) {
        const newtable = new Table_1.Table(table);
        let crearvar = new Declaracion_1.Declaracion(null, this.declaracion, this.expresiondecla, this.line, this.column, true);
        let variable;
        variable = crearvar.execute(newtable, tree);
        let result;
        result = this.condition.execute(newtable, tree);
        if (result instanceof Errors_1.Error) {
            return result;
        }
        this.condition.type = new Types_1.Type(Types_1.types.BOOLEAN);
        if (this.condition.type.type !== Types_1.types.BOOLEAN) {
            const error = new Errors_1.Error('Semantico', 'Se esperaba una expresion booleana para la condicion', this.line, this.column);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let newtable2;
        while (this.condition.execute(newtable, tree)) {
            newtable2 = new Table_1.Table(newtable);
            if (result instanceof Errors_1.Error) {
                return result;
            }
            this.condition.type = new Types_1.Type(Types_1.types.BOOLEAN);
            if (this.condition.type.type !== Types_1.types.BOOLEAN) {
                const error = new Errors_1.Error('Semantico', 'Se esperaba una expresion booleana para la condicion', this.line, this.column);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (result) {
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
                this.asignacion.execute(newtable, tree);
            }
        }
        /*
        if(result){
          do {
            result = this.condition.execute(newtable, tree);
            if (result instanceof Error) {
                return result;
            }
            this.condition.type=new Type(types.BOOLEAN);
            if (this.condition.type.type !== types.BOOLEAN) {
                const error = new Error('Semantico','Se esperaba una expresion booleana para la condicion',this.line, this.column);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.List.length; i++) {
                  if(String(this.List[i])==";"){
                    return;
                  }
                    const res = this.List[i].execute(newtable, tree);
                    if (res instanceof Continue) {
                        break;
                    } else if (res instanceof Break) {
                        return;
                    }
                }
            }
        } while (result);
        }*/
        return null;
    }
}
exports.For = For;
