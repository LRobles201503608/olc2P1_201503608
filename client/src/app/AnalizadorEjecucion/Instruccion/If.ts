import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Returns } from "../Expresiones/Returns";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class If extends Node {
    condition: Node;
    IfList: Array<Node>;
    ElseList: Array<Node>;
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
    constructor(condition: Node, IfList: Array<Node>, ElseList: Array<Node>, line: number, column: number) {
        super(null, line, column,true);
        this.condition = condition;
        this.IfList = IfList;
        this.ElseList = ElseList;
        this.linea=line;
        this.columna=column;
    }

    execute(table: Table, tree: Tree) {
        let newtable = new Table(table);
        let result: Node;
        result = this.condition.execute(table, tree);
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
        //debugger;
        if (result) {
          let newtable = new Table(table);
          let contadorreturn=0;
                let resultado;
            for (let i = 0; i < this.IfList.length; i++) {
              if(String(this.IfList[i])==";"){

              }else{

                const res = this.IfList[i].execute(newtable, tree);
                if(res instanceof Continue || res instanceof Break||res instanceof Returns){
                    return res;
                }/*if(res instanceof Returns){
                  resultado = res.expresion.execute(newtable,tree);
                  debugger;
                  contadorreturn++;
                  console.log(resultado);
                  break;
                }*/
              }

            }
            if(contadorreturn==1){
              return resultado;
            }

        } else {
             let contadorreturn=0;
             let resultado;
            for (let i = 0; i < this.ElseList.length; i++) {
              if(String(this.IfList[i])==";"){

              }else{
                const res = this.ElseList[i].execute(newtable, tree);
                if(res instanceof Continue || res instanceof Break || res instanceof Returns){
                    return res;
                }/*if(this.ElseList[i] instanceof Returns){
                  resultado = this.ElseList[i].execute(newtable,tree);
                  //debugger;
                  contadorreturn++;
                  console.log(resultado);
                  return resultado;
                }*/
              }

            }
        }

        return null;
    }
}
