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
export class Concat extends Node {
    identifier: String;
    expresion:Node;
    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, expresion:Node,line: number, column: number, editable:Boolean) {
        super(null, line, column,editable);
        this.identifier = identifier;
        this.expresion=expresion;
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
          let inicio=0;
          let fin=0;
          inicio=variable.iniciostring;
          fin=variable.finstring;
          let val=this.expresion.execute(tabla,tree)+"";
          for(let a=0;a<val.length;a++){
            let act=val.charCodeAt(a);
            let sigval=val.charCodeAt(a+1);
            if(act==92){
              if(sigval==110){
                act=10;
                a++;
              }else if(sigval==116){
                act=9;
                a++;
              }else if(sigval==114){
                act=13;
                a++;
              }
            }
            tree.modificar_heap(fin.toString(),act.toString());
            fin++;
          }
          variable.finstring=fin;
        }catch(ex){

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
          let vari=variable.value.toString();
          let val=this.expresion.execute(table,tree);
          let res=vari+val;
          return res;
        }catch(ex){
          const error = new Error('Semantico', 'Operacion no valida con el tipo de variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }

    }
}
