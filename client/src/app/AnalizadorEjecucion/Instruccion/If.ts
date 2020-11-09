import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Returns } from "../Expresiones/Returns";
import { Primitivos } from "../Expresiones/Primitivos";
import { Declaracion } from "./Declaracion";
import { Asignacion } from "./Asignacion";

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
      /*tree.traduccion.push(L1+":\n");
      let tabla2;
      for (let a = 0; a < this.IfList.length; a++) {
        const element = this.IfList[a];
        //debugger;
        try{
          if(element instanceof Declaracion || element instanceof Asignacion){
            let identi=element.identifier;
            let array = tabla.hijos;
            let encontrada:number=0;
            for (let a = 0; a < array.length; a++) {
              let elements = array[a];
              let datos=elements.Variables;
              datos.forEach(element => {
                if(element.identifier==identi && encontrada ==0){
                  tabla2=elements;
                  encontrada=1;
                }
              });
            }
          }
          let b =element.traducir(tabla2,tree,cadena,contTemp);

        }catch(ex){

        }

      }
      tree.traduccion.push(L2+":\n");
      let tabla3;
      for (let a = 0; a < this.ElseList.length; a++) {
        const element = this.ElseList[a];
        debugger;
        try{
          if(element instanceof Declaracion || element instanceof Asignacion){
            let identi=element.identifier;
            let array = tabla.hijos;
            let encontrada:number=0;

            for (let a = 0; a < array.length; a++) {
              debugger;
              let elements = array[a];
              let datos=elements.Variables;
              datos.forEach(element => {
                if(element.identifier==identi && encontrada ==0){
                  tabla3=elements;
                  encontrada=1;
                }
              });
            }
          }
          let b =element.traducir(tabla3,tree,cadena,contTemp);

        }catch(ex){

        }

      }*/
    }
    execute(table: Table, tree: Tree) {
        let L1;
        let L2;
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
        this.traducir(table,tree,"",0);
        //debugger;
        if (result) {
          let newtable = new Table(table);
          table.hijos.push(newtable);
          let contadorreturn=0;
                let resultado;
                L2=tree.operalist.pop();
                L1=tree.operalist.pop();
                tree.traduccion.push(L1+":\n");
            for (let i = 0; i < this.IfList.length; i++) {
              if(String(this.IfList[i])==";"){

              }else{
                //al arreglo de traduccion le hago push L1:
                const res = this.IfList[i].execute(newtable, tree);
                if(res instanceof Continue || res instanceof Break||res instanceof Returns){
                    //debugger;
                    return res;
                }/*if(res instanceof Returns){
                  resultado = res.expresion.execute(newtable,tree);
                  debugger;
                  contadorreturn++;
                  console.log(resultado);
                                          if condicion goto L1
                                          goto L2
                                          L1:
                                          instrucciones
                                          L2:
                  break;
                }*/
              }

            }
            tree.traduccion.push(L2+":\n")
            // hacer push de L2:
            if(contadorreturn==1){
              return resultado;
            }

        } else {
            table.hijos.push(newtable);
            L2=tree.operalist.pop();
            L1=tree.operalist.pop();
            tree.traduccion.push(L1+":\n");
            tree.traduccion.push(L2+":\n");
             let contadorreturn=0;
             let resultado;
            // hacer push de L1: en la traduccion
             for (let i = 0; i < this.ElseList.length; i++) {
              if(String(this.IfList[i])==";"){

              }else{
                // L2=tree.arregloL.pop();
                // L1=tree.arregloL.pop();
                //al arreglo de traduccion le hago push L2:
                const res = this.ElseList[i].execute(newtable, tree);
                if(res instanceof Continue || res instanceof Break || res instanceof Returns){
                    return res;
                }
              }

            }
            /*
                if condicion goto L1
                goto L2
                L1:
                L2:
                instrucciones
            */
        }

        return null;
    }
}
