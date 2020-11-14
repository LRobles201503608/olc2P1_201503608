import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";
import { Simbol } from "../Simbols/Simbol";
import { Cases } from "./Cases";
import { Default } from "./Default";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class Switch extends Node {
    declaracion:String;
    condition: Node;
    asignacion:Node;
    expresiondecla:Node;
    List: Array<Node>;
    line:number;
    column:number;
    /**
     * @constructor
     * @param condition
     *
     * @param List
     * @param line
     * @param column
     */
    constructor(condition:Node ,List: Array<Node>, line: number, column: number) {
        super(null, line, column,true);
        this.condition = condition;
        this.List = List;
        this.column=column;
        this.line=line;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

    }
    execute(table: Table, tree: Tree):any {
      let newtable=new Table(table);
      table.hijos.push(newtable);
      let valcondi=this.condition.execute(newtable,tree);
      tree.generar_3d("",valcondi+"","","t"+tree.temp);
      let condi="t"+tree.temp;
      tree.temp++;
      let lSalida="L"+tree.etiqueta;
      tree.etiqueta++;
      let conteoEncuentra=0;
      let funciona=0;
      for (let a = 0; a < this.List.length; a++) {
        const element = this.List[a];
        if(element instanceof Cases){
          let valcase= element.condition.execute(newtable,tree);
          tree.generar_3d("==",condi,valcase+"","t"+tree.temp);
          let valcondicion="t"+tree.temp;
          let lsi="L"+tree.etiqueta;
          let lno="L"+(tree.etiqueta+1);
          //debugger;
          tree.generarIFC3D(valcondicion,"L"+tree.etiqueta,"L"+(tree.etiqueta+1));
          tree.etiqueta=tree.etiqueta+2;
          tree.traduccion.push(lsi+":\n")
          if(valcondi==valcase && conteoEncuentra==0){

            element.execute(newtable,tree);
            conteoEncuentra++;

            funciona++;
            if(funciona==1){
              tree.traduccion.push("goto "+lSalida+";\n");
            }

          }
          tree.traduccion.push(lno+":\n")
        }else if(element instanceof Default){
          if(conteoEncuentra==0){
            element.execute(newtable,tree);
          }
        }
      }
      if(funciona==1){
        tree.traduccion.push(lSalida+":\n");
      }
  }
}
