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
export class Lengths extends Node {
    identifier: String;
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, line: number, column: number, editable:Boolean) {
        super(null, line, column,editable);
        this.identifier = identifier;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      let variable: Simbol;
        variable = tabla.getVariable(this.identifier);
        if (variable == null) {
            const error = new Error('Semantico', 'No se ha encontrado la variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        try{
          if(variable.type.type == types.STRING){
            let vari=variable.value+"";
            let tam= vari.length;
            tree.generar_3d("",tam.toString(),"","t"+tree.temp);
            tree.temp++;
          }else{
            const error = new Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        }catch(ex){
           const error = new Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
    }
    execute(table: Table, tree: Tree) {
        let variable: Simbol;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Error('Semantico', 'No se ha encontrado la variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        try{
          if(variable.type.type == types.STRING){
            let vari=variable.value+"";
            return vari.length;
          }else{
            const error = new Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        }catch(ex){
           const error = new Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }

    }
}
