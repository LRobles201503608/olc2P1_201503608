import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Primitivos } from "../Expresiones/Primitivos";
import { Identifier } from "../Expresiones/Identifier";

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
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      let condicion;
      let a=this.condition.traducir(tabla,tree,cadena,contTemp);
      if(this.condition instanceof Primitivos){
        condicion = a;
      }else{
        condicion ="(int)"+tree.tmpsop.pop();
      }

      let L1="L"+tree.etiqueta;
      tree.etiqueta++;
      let L2="L"+tree.etiqueta;
      tree.etiqueta++;
      tree.operalist.push(L1);
      tree.operalist.push(L2);
      let gen= tree.generarIFC3D(condicion.toString(),L1.toString(),L2.toString());
    }
    execute(table: Table, tree: Tree) {
        let L1;
        let L2;
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
        //debugger;
        this.traducir(table,tree,"",0);
        if (result) {
          L2=tree.operalist.pop();
          L1=tree.operalist.pop();
          tree.traduccion.push(L1+":\n");
          if(String(this.IfList)==";"){

              }else{
                const res = this.IfList.execute(newtable, tree);
                if(this.IfList instanceof Primitivos){
                  let a=this.IfList.traducir(newtable,tree,"",0);
                  tree.traduccion.push("t"+tree.temp+"="+a.toString()+";\n");
                  tree.tmpsop.push("t"+tree.temp);
                  tree.temp++;
                }else if(this.IfList instanceof Identifier){
                  let a=this.ElseList.traducir(newtable,tree,"",0);
                  tree.tmpsop.push("t"+(tree.temp-1));
                }
                if(res instanceof Continue || res instanceof Break){
                    return res;
                }
                tree.traduccion.push(L2+":\n")
                return res;
              }
        } else {
              if(String(this.IfList)==";"){

              }else{
                L2=tree.operalist.pop();
                L1=tree.operalist.pop();
                tree.traduccion.push(L1+":\n");
                tree.traduccion.push(L2+":\n")
                const res = this.ElseList.execute(newtable, tree);
                if(this.ElseList instanceof Primitivos){
                  let a=this.ElseList.traducir(newtable,tree,"",0);
                  tree.traduccion.push("t"+tree.temp+"="+a.toString()+";\n");
                  tree.tmpsop.push("t"+tree.temp);
                  tree.temp++;
                }else if(this.ElseList instanceof Identifier){
                  let a=this.ElseList.traducir(newtable,tree,"",0);
                  tree.tmpsop.push("t"+(tree.temp-1));
                }
                if(res instanceof Continue || res instanceof Break){
                    return res;
                }
                return res;
              }
        }

        return null;
    }
}
