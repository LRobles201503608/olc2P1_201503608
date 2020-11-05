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
export class AsignaArrays extends Node {
    identifier: String;
    value: Array<Node>;
    expre:Node;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, value: Array<Node>,expre:Node ,line: number, column: number, editable:Boolean) {
        super(null, line, column,editable);
        this.identifier = identifier;
        this.value = value;
        this.expre=expre;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {

    }
    execute(table: Table, tree: Tree) {
      //console.log(this.expre);
      //console.log(this.value);
      let variable: Simbol;
        variable = table.getVariable(this.identifier);
        debugger;
        if (variable == null) {
            const error = new Error('Semantico', 'No se ha encontrado la variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let tam= this.value.length;
        let valor=variable.value;
        if(tam==1){
          valor[this.value[0].execute(table,tree)]=this.expre.execute(table,tree);
        }
        if(tam==2){
          valor[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)]=this.expre.execute(table,tree);
        }
        if(tam==3){
          valor[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)]=this.expre.execute(table,tree);
        }
        if(tam==4){
          valor[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)]=this.expre.execute(table,tree);
        }
        if(tam==5){
          valor[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)][this.value[4].execute(table,tree)]=this.expre.execute(table,tree);
        }
        if(tam==6){
          valor[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)][this.value[4].execute(table,tree)][this.value[5].execute(table,tree)]=this.expre.execute(table,tree);
        }
        if(tam==7){
          valor[this.value[0].execute(table,tree)][this.value[1].execute(table,tree)][this.value[2].execute(table,tree)][this.value[3].execute(table,tree)][this.value[4].execute(table,tree)][this.value[5].execute(table,tree)][this.value[6].execute(table,tree)]=this.expre.execute(table,tree);
        }
    }
}
