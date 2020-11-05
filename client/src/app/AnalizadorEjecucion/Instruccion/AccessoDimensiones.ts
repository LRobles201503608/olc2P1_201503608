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
export class AccesoArrays extends Node {
    identifier: String;
    value: Array<Node>;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, value: Array<Node>, line: number, column: number, editable:Boolean) {
        super(null, line, column,editable);
        this.identifier = identifier;
        this.value = value;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

    }
    execute(table: Table, tree: Tree) {
      //console.log(this.value);
      let variable: Simbol;
        variable = table.getVariable(this.identifier);
        //debugger;
        if (variable == null) {
            const error = new Error('Semantico', 'No se ha encontrado la variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let tam= this.value.length;
        if(tam==1){
          console.log(this.value[0].execute(table,tree));
          return variable.value[this.value[0].execute(table,tree)];
        }else if(tam==2){
          return variable.value[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)];
        }else if(tam==3){
          return variable.value[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)];
        }else if(tam==4){
          return variable.value[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)];
        }else if(tam==5){
          return variable.value[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)][this.value[4].execute(table,tree)];
        }else if(tam==6){
          return variable.value[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)][this.value[4].execute(table,tree)][this.value[5].execute(table,tree)];
        }else if(tam==7){
          return variable.value[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)][this.value[4].execute(table,tree)][this.value[5].execute(table,tree)][this.value[6].execute(table,tree)];
        }
    }
}
