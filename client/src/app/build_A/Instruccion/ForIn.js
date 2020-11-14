"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
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
class ForIn extends Node_1.Node {
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
        let valdec = tabla.getVariable(this.declaracion);
        let valarray = tabla.getVariable(this.condition);
        let tamarray = valarray.value.length;
        debugger;
        let tmp1;
        if (valdec.entorno == 0) {
            tmp1 = valdec.posh;
            let tempo = tree.obtener_Heap(tmp1 + "", "t" + tree.temp);
            tree.tmpsop.push(tempo);
            tree.temp++;
        }
        else {
            tmp1 = valdec.poss;
            let tempo = tree.obtener_stack(tmp1 + "", "t" + tree.temp);
            tree.tmpsop.push(tempo);
            tree.temp++;
        }
        tree.traduccion.push("t" + tree.temp + "=" + tamarray + ";\n");
        tree.tmpsop.push("t" + tree.temp);
        tree.temp++;
        tree.traduccion.push(L3 + ":\n");
        let condiciond = tree.tmpsop.pop();
        let condicionl = tree.tmpsop.pop();
        tree.generar_3d("<", condicionl + "", condiciond + "", "t" + tree.temp);
        tree.tmpsop.push("t" + tree.temp);
        tree.temp++;
        tree.generarIFC3D(tree.tmpsop.pop() + "", "" + L1, "" + L2);
    }
    execute(table, tree) {
        let newtable = new Table_1.Table(table);
        table.hijos.push(newtable);
        let simbol;
        simbol = new Simbol_1.Simbol(new Types_1.Type(Types_1.types.NUMERIC), this.declaracion, 0, true, null, null, this.line, this.columna);
        simbol.poss = tree.poss;
        tree.poss += 25;
        simbol.entorno = 1;
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
        debugger;
        let newtable2;
        let L1;
        let L2;
        let L3;
        let traducidas = 0;
        this.traducir(newtable, tree, "", 0);
        L3 = tree.operalist.pop();
        L2 = tree.operalist.pop();
        L1 = tree.operalist.pop();
        tree.traduccion.push(L1 + ":\n");
        for (simval in varval) {
            simbol.value = simval;
            newtable2 = new Table_1.Table(newtable);
            newtable.hijos.push(newtable2);
            for (let i = 0; i < this.List.length; i++) {
                if (String(this.List[i]) == ";") {
                }
                else {
                    const res = this.List[i].execute(newtable2, tree);
                    if (res instanceof Continue_1.Continue) {
                        tree.traduccion.push(L2 + ":\n");
                        break;
                    }
                    else if (res instanceof Break_1.Break) {
                        tree.traduccion.push(L2 + ":\n");
                        return;
                    }
                }
            }
        }
        tree.traduccion.push("goto " + L2 + ";\n");
        tree.traduccion.push(L2 + ":\n");
    }
}
exports.ForIn = ForIn;
