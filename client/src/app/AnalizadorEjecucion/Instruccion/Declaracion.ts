import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Simbol } from "../Simbols/Simbol";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion extends Node {
    type: Type;
    identifier: String;
    value: Node;
    edit:Boolean;
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type: Type, identifier: String, value: Node, line: number, column: number,editable:Boolean) {
        super(type, line, column,editable);
        this.identifier = identifier;
        this.value = value;
        this.edit=editable;
    }

    execute(table: Table, tree: Tree) {
      let result;
      if(this.value!=null){
        result = this.value.execute(table, tree);
      } else{
        result =null;
      }
        if (result instanceof Error) {
            return result;
        }
        if(result!=null){
          if (this.type == null) {
            if(this.value.type!=null){
              this.type = new Type(this.value.type.type);
            }else{
              this.type = new Type(types.NUMERIC);
            }
          }
          if(this.value.type!=null){
            if (this.type.type != this.value.type.type) {
              const error = new Error('Semantico', 'Los tipos de datos no coinciden', this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
              return error;
            }
          }
        }
        let simbol;
          simbol = new Simbol(this.type, this.identifier, result, this.edit);
          const res = table.setVariable(simbol);
          if (res != null) {
              const error = new Error('Semantico', res, this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
          }
          return null;
    }
}
