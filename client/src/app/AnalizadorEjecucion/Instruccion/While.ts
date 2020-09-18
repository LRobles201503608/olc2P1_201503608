import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class While extends Node {
    condition: Node;
    List: Array<Node>;
    line:number;
    column:number;
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param List Lista de instrucciones a ejecutar mientras la condicion sea verdadera
     * @param line Linea de la sentencia while
     * @param column Columna de la sentencia while
     */
    constructor(condition: Node, List: Array<Node>, line: number, column: number) {
        super(null, line, column,true);
        this.condition = condition;
        this.List = List;
        this.column=column;
        this.line=line;
    }

    execute(table: Table, tree: Tree):any {
        const newtable = new Table(table);
        let result: Node;
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
        while(this.condition.execute(newtable, tree)){
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
