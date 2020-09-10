import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';

/**
 * La @class Primitivos es para los nodos de tipo de datos primitivos
 */

export class Primitivos extends Node{
  val:Object;

  /**
   *
   * @param type tipo que tiene el valor primitivo
   * @param val valor primitivo
   * @param linea linea donde se encuentra
   * @param columna columna donde se encuentra
   */
  constructor(type:Type, val:Object, linea:number, columna:number){
    super(type,linea,columna);
    this.val=val;
  }


  /**
   * @param table tabla de simbolos
   * @param tree arbol de nodos
   */
  execute(table: Table, tree: Tree) {
    return this.val;
  }

}
