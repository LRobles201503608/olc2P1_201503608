import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class For extends Node {
    declaracion:String;
    condition: Node;
    asignacion:Node;
    expresiondecla:Node;
    List: Array<Node>;
    line:number;
    column:number;
    /**
     * @constructor
     * @param declaracion nodo de declaraciones
     * @param condition
     *
     * @param List
     * @param line
     * @param column
     */
    constructor(declaracion:String,expresiondecla:Node,condition: Node, asignacion:Node,List: Array<Node>, line: number, column: number) {
        super(null, line, column,true);
        this.declaracion=declaracion;
        this.condition = condition;
        this.asignacion=asignacion;
        this.List = List;
        this.column=column;
        this.line=line;
        this.expresiondecla=expresiondecla;
    }

    execute(table: Table, tree: Tree):any {
        const newtable = new Table(table);
        let crearvar:Node=new Declaracion(null,this.declaracion,this.expresiondecla,this.line,this.column,true);
        let variable:Node
        variable= crearvar.execute(newtable,tree);
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
            this.asignacion.execute(newtable,tree);
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
