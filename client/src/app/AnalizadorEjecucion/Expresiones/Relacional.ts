import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';

/**
 * Esta @clase creara un nodo de tipo @RELACIONAL
*/

export class Relacional extends Node{
  izquierda:Node;
  derecha:Node;
  Operador:String;

  /**
   * @param izquierda corresponde a la parte izquierda de la operacion
   * @param derecha corresponde a la parte derecha de la operacion
   * @param operador operador relacional
   * @param linea linea de la operacion
   * @param columna columna de la operacion
   */

  constructor(izquierda:Node,derecha:Node,operador:String,linea:number,columna:number){
    super(null,linea,columna);
      this.izquierda=izquierda;
      this.derecha=derecha;
      this.Operador=operador;
  }

  execute(table: Table, tree: Tree) {
      if(this.derecha==null){
          const error= new Error('Semantico', 'Se necesita del operador derecho', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
      }else{
        const izqresultado= this.izquierda.execute(table,tree);
        const derresultado= this.derecha.execute(table,tree);
        if(izqresultado instanceof Error){
          return izqresultado;
        }
        if(derresultado instanceof Error){
          return izqresultado;
        }
        if(this.Operador=='<'){
          if(this.izquierda.type.type==types.NUMERIC && this.derecha.type.type==types.NUMERIC){
            return izqresultado < derresultado;
          }else{
            const error= new Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        } else if(this.Operador=='>'){
          if(this.izquierda.type.type==types.NUMERIC && this.derecha.type.type==types.NUMERIC){
            return izqresultado > derresultado;
          }else{
            const error= new Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        } else if(this.Operador=='<='){
          if(this.izquierda.type.type==types.NUMERIC && this.derecha.type.type==types.NUMERIC){
            return izqresultado <= derresultado;
          }else{
            const error= new Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        } else if(this.Operador=='>='){
          if(this.izquierda.type.type==types.NUMERIC && this.derecha.type.type==types.NUMERIC){
            return izqresultado >= derresultado;
          }else{
            const error= new Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        } else if (this.Operador=='=='){
          if(this.izquierda.type.type==types.NUMERIC && this.derecha.type.type==types.NUMERIC){
            return izqresultado == derresultado;
          }else if(this.izquierda.type.type==types.STRING && this.derecha.type.type==types.STRING){
            return izqresultado == derresultado;
          }else if(this.izquierda.type.type==types.BOOLEAN && this.derecha.type.type==types.BOOLEAN){
            return izqresultado == derresultado;
          }else{
            const error= new Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        }else if (this.Operador=='!='){
          if(this.izquierda.type.type==types.NUMERIC && this.derecha.type.type==types.NUMERIC){
            return izqresultado != derresultado;
          }else if(this.izquierda.type.type==types.STRING && this.derecha.type.type==types.STRING){
            return izqresultado != derresultado;
          }else if(this.izquierda.type.type==types.BOOLEAN && this.derecha.type.type==types.BOOLEAN){
            return izqresultado != derresultado;
          }else{
            const error= new Error('Semantico', 'Error en los tipos a comparar', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        }else{
            const error= new Error('Semantico', 'Error signo operador desconocido', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
      }
  }

}
