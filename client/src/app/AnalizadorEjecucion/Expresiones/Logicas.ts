import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';

/**
 * Esta @clase creara un nodo de tipo @LOGICA
*/
export class Logica extends Node{
  izquierda:Node;
  derecha:Node;
  Operador:String;

  /**
   *
   * @param izquierda es el operador izquierdo en la operacion logica
   * @param derecha es el operador derecho en la operacion logica
   * @param operador es el signo operador
   * @param linea linea donde se encuentra la operacion
   * @param columna columna donde se encuentra la operacion
   */

    constructor(izquierda:Node,derecha:Node,operador:String,linea:number,columna:number){
      super(null,linea,columna,true);
      this.izquierda=izquierda;
      this.derecha=derecha;
      this.Operador=operador;
    }

  /**
   *
   * @param table tabla de simbolos
   * @param tree arbol de nodos
   */
  execute(table: Table, tree: Tree) {
    if(this.derecha==null){
      const izqresult=this.izquierda.execute(table,tree);
      if(izqresult instanceof Error){
        return izqresult;
      }

      if(this.Operador=='!'){
        if(this.izquierda.type.type==types.BOOLEAN){
          return !this.izquierda;
        } else {
          const error= new Error('Semantico', 'No se puede operar el operador not con esta expresion', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }else{
          const error= new Error('Semantico', 'Operador no reconocido', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
      }
    }else{
      const izqresultado= this.izquierda.execute(table,tree);
      const derresultado= this.derecha.execute(table,tree);
      if(izqresultado instanceof Error){
        return izqresultado;
      }
      if(derresultado instanceof Error){
        return derresultado;
      }
      if(this.Operador=='||'){
        if(this.izquierda.type.type==types.BOOLEAN && this.derecha.type.type==types.BOOLEAN){
          return izqresultado || derresultado;
        }else {
          const error= new Error('Semantico', 'Tipos de datos no comparables por logicals', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }else if(this.Operador=='&&'){
        if(this.izquierda.type.type==types.BOOLEAN && this.derecha.type.type==types.BOOLEAN){
          return izqresultado && derresultado;
        }else {
          const error= new Error('Semantico', 'Tipos de datos no comparables por logicals', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else{
        if(this.izquierda.type.type==types.BOOLEAN && this.derecha.type.type==types.BOOLEAN){
          return izqresultado||derresultado;
        }else {
          const error= new Error('Semantico', 'Operador desconocido', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }
    }
  }

}
