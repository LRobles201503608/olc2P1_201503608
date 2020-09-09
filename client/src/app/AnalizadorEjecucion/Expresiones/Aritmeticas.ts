import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';

/**
 * Esta @clase creara un nodo de tipo @ARITMETICA
*/

export class Aritmetica extends Node{
  izquierda:Node;
  derecha:Node;
  Operador:String;

  /**
   * El @constructor estará conformado de la siguiente manera
   * @izquierda es la parte izquierda de la expresion (@nodos )
   * @derecha es la parte derecha de la expresion (@nodos )
   * @operador es la operacion que vamos a realizar
   * @linea linea donde se encuentra
   * @columna columna donde se encuentra
  */
  constructor(izquierda:Node,derecha:Node,operador:String,linea:number,columna:number){
    super(null,linea,columna);
    this.izquierda=izquierda;
    this.derecha=derecha;
    this.Operador=operador;
  }
  execute(table: Table, tree: Tree) {

  }


}
