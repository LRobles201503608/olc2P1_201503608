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
export class Incremento extends Node {
    identifier: String;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Incremento
     * @param identifier nombre de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, line: number, column: number, editable:Boolean) {
        super(null, line, column,editable);
        this.identifier = identifier;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      let variable:Simbol;
        variable = tabla.getVariable(this.identifier);
        if(variable==null){
          const error= new Error('Semantico', 'No se puede encontrar la variable', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
        if(variable.entorno==0){
          let value=tree.obtener_Heap(variable.posh.toString(),"t"+tree.temp);
          tree.temp++;
          let a=tree.generar_3d("+",value.toString(),"1","t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          let b = tree.tmpsop.pop();
          tree.modificar_heap(variable.posh.toString(),b.toString());
          tree.temp++;
          return a;
        }else{
          let value=tree.obtener_stack(variable.poss.toString(),"t"+tree.temp);
          tree.temp++;
          let a=tree.generar_3d("+",value.toString(),"1","t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          let b = tree.tmpsop.pop();
          tree.modificar_stack(variable.poss.toString(),b.toString());
          tree.temp++;
          return a;
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
        if (variable.type.type==null){
          variable.type.type=types.NUMERIC;
          return null;
        }

        if (variable.type.type!= types.NUMERIC) {
            const error = new Error('Semantico', `No se puede asignar la variable porque los tipos no coinciden.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if(variable.editable==false){
          const error = new Error('Semantico', `No se puede asignar a la variable porque es una constante.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        variable.value = Number(variable.value) + 1;
        this.traducir(table,tree,"",0);
        return variable.value;
    }
}
