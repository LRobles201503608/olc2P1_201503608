import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Primitivos } from "../Expresiones/Primitivos";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class DoWhile extends Node {
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
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      let L1="L"+tree.etiqueta;
      tree.etiqueta++;
      let L2="L"+tree.etiqueta;
      tree.etiqueta++;
      let L3="L"+tree.etiqueta;
      tree.etiqueta++;
      tree.operalist.push(L1);
      tree.operalist.push(L2);
      tree.operalist.push(L3);
      tree.traduccion.push("goto "+L1+";\n");
      tree.traduccion.push(L3+":\n");
      let condicion;
      let a=this.condition.traducir(tabla,tree,cadena,contTemp);
      if(this.condition instanceof Primitivos){
        condicion = a;
      }else{
        condicion ="(int)"+tree.tmpsop.pop();
      }
      let gen= tree.generarWhileC3D(condicion.toString(),L1.toString(),L2.toString());
    }
    execute(table: Table, tree: Tree):any {
        let newtable;
        let result:Node;
        let L1;
        let L2;
        let L3;
        let traducidas=0;
        this.traducir(table,tree,"",0);
        L3=tree.operalist.pop();
        L2=tree.operalist.pop();
        L1=tree.operalist.pop();
        tree.traduccion.push(L1+":\n");
        do {
            newtable = new Table(table);
            table.hijos.push(newtable);
            result = this.condition.execute(table, tree);
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
              for (let i = 0; i < this.List.length; i++) {
                if (String(this.List[i]) == ";") {

                }else{
                  const res = this.List[i].execute(newtable, tree);
                  if (res instanceof Continue) {
                    tree.traduccion.push(L2+":\n");
                      break;
                  }
                  else if (res instanceof Break) {
                    tree.traduccion.push(L2+":\n");
                      return;
                  }
                }
            }
            traducidas++;
            if(traducidas==1){

            }
        } while (result);
        tree.traduccion.push("goto "+L3+";\n");
        tree.traduccion.push(L2+":\n");
        return null;
    }
}
