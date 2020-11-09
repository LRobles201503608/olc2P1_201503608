"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Primitivos_1 = require("../Expresiones/Primitivos");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class DoWhile extends Node_1.Node {
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
    traducir(tabla, tree, cadena, contTemp) {
        let L1 = "L" + tree.etiqueta;
        tree.etiqueta++;
        let L2 = "L" + tree.etiqueta;
        tree.etiqueta++;
        let L3 = "L" + tree.etiqueta;
        tree.etiqueta++;
        tree.operalist.push(L1);
        tree.operalist.push(L2);
        tree.operalist.push(L3);
        tree.traduccion.push("goto " + L1 + ";\n");
        tree.traduccion.push(L3 + ":\n");
        let condicion;
        let a = this.condition.traducir(tabla, tree, cadena, contTemp);
        if (this.condition instanceof Primitivos_1.Primitivos) {
            condicion = a;
        }
        else {
            condicion = "(int)" + tree.tmpsop.pop();
        }
        let gen = tree.generarWhileC3D(condicion.toString(), L1.toString(), L2.toString());
    }
    execute(table, tree) {
        let newtable;
        let result;
        let L1;
        let L2;
        let L3;
        let traducidas = 0;
        this.traducir(table, tree, "", 0);
        L3 = tree.operalist.pop();
        L2 = tree.operalist.pop();
        L1 = tree.operalist.pop();
        tree.traduccion.push(L1 + ":\n");
        do {
            newtable = new Table_1.Table(table);
            table.hijos.push(newtable);
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
            for (let i = 0; i < this.List.length; i++) {
                if (String(this.List[i]) == ";") {
                }
                else {
                    const res = this.List[i].execute(newtable, tree);
                    if (res instanceof Continue_1.Continue) {
                        break;
                    }
                    else if (res instanceof Break_1.Break) {
                        return;
                    }
                }
            }
            traducidas++;
            if (traducidas == 1) {
                tree.traduccion.push("goto " + L3 + ";\n");
            }
        } while (result);
        tree.traduccion.push(L2 + ":\n");
        return null;
    }
}
exports.DoWhile = DoWhile;
