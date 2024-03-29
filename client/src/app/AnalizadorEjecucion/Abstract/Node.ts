import {Type} from '../util/Types';
import { Tree } from '../Simbols/Tree';
import { Table } from '../Simbols/Table';
import { TypeofExpr } from '@angular/compiler';

export abstract class Node{
  linea:number;
  columna:number;
  type:Type;
  editable:Boolean;
  /**
   *El metodo @execute servira para ejecutar instrucciones y reconocer expresiones en el caso de
   *las expresiones devuelven un tipo y las instrucciones no
   **/

   abstract execute(table:Table, tree:Tree):any;
   abstract traducir(tabla:Table,tree:Tree,cadena:string,contTemp:number):any;

    /**
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
     * @param editable este determina si una variable puede ser editada o no
    */
   constructor(type:Type, line: number, column: number,editable:Boolean){
      this.type=type;
      this.linea=line;
      this.columna= column;
      this.editable=editable;
   }
}
