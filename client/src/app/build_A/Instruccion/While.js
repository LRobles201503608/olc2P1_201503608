"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class While extends Node_1.Node {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(condition, List, line, column) {
        super(null, line, column, true);
        this.condition = condition;
        this.List = List;
        this.column = column;
        this.line = line;
    }
    execute(table, tree) {
        /*while(this.condition.execute(table, tree)){
          if (result instanceof Error) {
            return result;
         }
        this.condition.type = new Type(types.BOOLEAN);
        if (this.condition.type.type !== types.BOOLEAN) {
            const error = new Error('Semantico', 'Se esperaba una expresion booleana para la condicion', this.line, this.column);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (result) {
            for (let i = 0; i < this.List.length; i++) {
                if (String(this.List[i]) == ";") {

                }else{
                  const res = this.List[i].execute(newtable, tree);
                  if (res instanceof Continue) {
                      break;
                  }
                  else if (res instanceof Break) {
                      return;
                  }
                }
            }
        }
      }*/
        let result;
        do {
            const newtable = new Table_1.Table(table);
            result = this.condition.execute(table, tree);
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
                        return;
                    }
                    const res = this.List[i].execute(newtable, tree);
                    if (res instanceof Continue_1.Continue) {
                        break;
                    }
                    else if (res instanceof Break_1.Break) {
                        return;
                    }
                }
            }
        } while (result);
        return null;
    }
}
exports.While = While;
