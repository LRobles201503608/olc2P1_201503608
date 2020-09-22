import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class Ternario extends Node {
    condition: Node;
    IfList: Node;
    ElseList: Node;
    linea:number;
    columna:number;
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param IfList Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param ElseList Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(condition: Node, IfList: Node, ElseList: Node, line: number, column: number) {
        super(null, line, column,true);
        this.condition = condition;
        this.IfList = IfList;
        this.ElseList = ElseList;
        this.linea=line;
        this.columna=column;
    }

    execute(table: Table, tree: Tree) {
        const newtable = new Table(table);
        let result: Node;
        result = this.condition.execute(newtable, tree);
        if (result instanceof Error) {
            return result;
        }
        this.condition.type=new Type(types.BOOLEAN);
        if (this.condition.type.type !== types.BOOLEAN) {
            const error = new Error('Semantico','Se esperaba una expresion de tipo booleana no encontrada',this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }

        if (result) {
              if(String(this.IfList)==";"){

              }else{
                const res = this.IfList.execute(newtable, tree);
                if(res instanceof Continue || res instanceof Break){
                    return res;
                }
                return res;
              }


        } else {
              if(String(this.IfList)==";"){

              }else{
                const res = this.ElseList.execute(newtable, tree);
                if(res instanceof Continue || res instanceof Break){
                    return res;
                }
                return res;
              }
        }

        return null;
    }
}
