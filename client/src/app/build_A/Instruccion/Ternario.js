"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Node_1 = require("../Abstract/Node");
const Table_1 = require("../Simbols/Table");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
const Errors_1 = require("../util/Errors");
const Types_1 = require("../util/Types");
const Primitivos_1 = require("../Expresiones/Primitivos");
const Identifier_1 = require("../Expresiones/Identifier");
/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
class Ternario extends Node_1.Node {
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
    traducir(tabla, tree, cadena, contTemp) {
        let condicion;
        let a = this.condition.traducir(tabla, tree, cadena, contTemp);
        if (this.condition instanceof Primitivos_1.Primitivos) {
            condicion = a;
        }
        else {
            condicion = "(int)" + tree.tmpsop.pop();
        }
        let L1 = "L" + tree.etiqueta;
        tree.etiqueta++;
        let L2 = "L" + tree.etiqueta;
        tree.etiqueta++;
        tree.operalist.push(L1);
        tree.operalist.push(L2);
        let gen = tree.generarIFC3D(condicion.toString(), L1.toString(), L2.toString());
    }
    execute(table, tree) {
        let L1;
        let L2;
        const newtable = new Table_1.Table(table);
        let result;
        result = this.condition.execute(newtable, tree);
        if (result instanceof Errors_1.Error) {
            return result;
        }
        this.condition.type = new Types_1.Type(Types_1.types.BOOLEAN);
        if (this.condition.type.type !== Types_1.types.BOOLEAN) {
            const error = new Errors_1.Error('Semantico', 'Se esperaba una expresion de tipo booleana no encontrada', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        //debugger;
        this.traducir(table, tree, "", 0);
        if (result) {
            L2 = tree.operalist.pop();
            L1 = tree.operalist.pop();
            tree.traduccion.push(L1 + ":\n");
            if (String(this.IfList) == ";") {
            }
            else {
                const res = this.IfList.execute(newtable, tree);
                if (this.IfList instanceof Primitivos_1.Primitivos) {
                    let a = this.IfList.traducir(newtable, tree, "", 0);
                    tree.traduccion.push("t" + tree.temp + "=" + a.toString() + ";\n");
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
                else if (this.IfList instanceof Identifier_1.Identifier) {
                    let a = this.ElseList.traducir(newtable, tree, "", 0);
                    tree.tmpsop.push("t" + (tree.temp - 1));
                }
                if (res instanceof Continue_1.Continue || res instanceof Break_1.Break) {
                    return res;
                }
                tree.traduccion.push(L2 + ":\n");
                return res;
            }
        }
        else {
            if (String(this.IfList) == ";") {
            }
            else {
                L2 = tree.operalist.pop();
                L1 = tree.operalist.pop();
                tree.traduccion.push(L1 + ":\n");
                tree.traduccion.push(L2 + ":\n");
                const res = this.ElseList.execute(newtable, tree);
                if (this.ElseList instanceof Primitivos_1.Primitivos) {
                    let a = this.ElseList.traducir(newtable, tree, "", 0);
                    tree.traduccion.push("t" + tree.temp + "=" + a.toString() + ";\n");
                    tree.tmpsop.push("t" + tree.temp);
                    tree.temp++;
                }
                else if (this.ElseList instanceof Identifier_1.Identifier) {
                    let a = this.ElseList.traducir(newtable, tree, "", 0);
                    tree.tmpsop.push("t" + (tree.temp - 1));
                }
                if (res instanceof Continue_1.Continue || res instanceof Break_1.Break) {
                    return res;
                }
                return res;
            }
        }
        return null;
    }
}
exports.Ternario = Ternario;
