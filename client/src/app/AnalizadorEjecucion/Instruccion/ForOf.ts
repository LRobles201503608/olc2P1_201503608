import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class ForOf extends Node {
    declaracion:String;
    condition: String;
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
    constructor(declaracion:String,condition:String ,List: Array<Node>, line: number, column: number) {
        super(null, line, column,true);
        this.declaracion=declaracion;
        this.condition = condition;
        this.List = List;
        this.column=column;
        this.line=line;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

    }
    execute(table: Table, tree: Tree):any {
      let newtable=new Table(table);
      let simbol;
          simbol = new Simbol(new Type(types.NUMERIC), this.declaracion, null, true,null,null);

          const res = newtable.setVariable(simbol);
          if (res != null) {
              const error = new Error('Semantico', res, this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
          }
          let variable: Simbol;
          variable = newtable.getVariable(this.condition);

          let simval= simbol.value;
          let varval= variable.value;

          let newtable2;
          //debugger;
          for(simval of varval){
            simbol.value=simval;
            newtable2=new Table(newtable);
            for (let i = 0; i < this.List.length; i++) {
              if (String(this.List[i]) == ";") {

              }else{
                const res = this.List[i].execute(newtable2, tree);
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
}
