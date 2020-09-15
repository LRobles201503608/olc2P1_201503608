import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Reasigna el valor de una variable existente
 */
export class Asignacion extends Node {
    identifier: String;
    value: Node;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, value: Node, line: number, column: number, editable:Boolean) {
        super(null, line, column,editable);
        this.identifier = identifier;
        this.value = value;
    }

    execute(table: Table, tree: Tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Error) {
            return result;
        }

        let variable: Simbol;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Error('Semantico', 'No se ha encontrado la variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }


        if (this.value.type.type != variable.type.type) {
            const error = new Error('Semantico', `No se puede asignar la variable porque los tipos no coinciden.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if(variable.editable==false){
          const error = new Error('Semantico', `No se puede asignar a la variable porque es una constante.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        variable.value = result;
        return null;
    }
}
