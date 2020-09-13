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
    if(this.derecha==null){
      const izqresultado= this.izquierda.execute(table,tree);
      if(izqresultado instanceof Error){
        return izqresultado;
      }if(this.Operador=='-'){
        if(this.izquierda.type.type== types.NUMERIC){
          this.type=new Type(types.NUMERIC);
          return -1*izqresultado;
        } else {
          const error= new Error('Semantico', 'No se puede operar el operador unario', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      } else if(this.Operador=='--'){
        if(this.izquierda.type.type== types.NUMERIC){
          this.type=new Type(types.NUMERIC);
          return izqresultado-1;
        } else {
          const error= new Error('Semantico', 'No se puede operar el operador unario', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }else if(this.Operador=='++'){
        if(this.izquierda.type.type== types.NUMERIC){
          this.type=new Type(types.NUMERIC);
          return izqresultado+1;
        } else {
          const error= new Error('Semantico', 'No se puede operar el operador unario', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }else{
        const error= new Error('Semantico', 'No existe el operador unario', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
      }
    } else{
      const izqresultado= this.izquierda.execute(table,tree);
      const derresultado= this.derecha.execute(table,tree);
      if(izqresultado instanceof Error){
        return izqresultado;
      }
      if(derresultado instanceof Error){
        return derresultado;
      }

      if(this.Operador=='+'){
        if (this.izquierda.type.type == types.NUMERIC && this.derecha.type.type == types.NUMERIC) {
          this.type = new Type(types.NUMERIC);
          return izqresultado + derresultado;
        } else if (this.izquierda.type.type == types.STRING || this.derecha.type.type == types.STRING) {
          this.type = new Type(types.STRING);
          return izqresultado + derresultado;
        } else{
          const error= new Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }
      else if(this.Operador=='-'){
        if (this.izquierda.type.type == types.NUMERIC && this.derecha.type.type == types.NUMERIC) {
          this.type = new Type(types.NUMERIC);
          return izqresultado - derresultado;
        }else{
          const error= new Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }
      else if(this.Operador=='*'){
        if (this.izquierda.type.type == types.NUMERIC && this.derecha.type.type == types.NUMERIC) {
          this.type = new Type(types.NUMERIC);
          return izqresultado * derresultado;
        }else{
          const error= new Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }
      else if(this.Operador=='/'){
        if (this.izquierda.type.type == types.NUMERIC && this.derecha.type.type == types.NUMERIC) {
          if(derresultado==0){
            const error= new Error('Semantico', 'No se puede operar porque el operador derecho es 0', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }else{
            this.type = new Type(types.NUMERIC);
            return izqresultado / derresultado;
          }
        } else{
          const error= new Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }
      else if(this.Operador=='**'){
        if (this.izquierda.type.type == types.NUMERIC && this.derecha.type.type == types.NUMERIC) {
          if(izqresultado==0 && derresultado==0){
            const error= new Error('Semantico', 'No se puede operar porque el operador izquierdo y derecho es 0', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }else{
            this.type = new Type(types.NUMERIC);
            return izqresultado ** derresultado;
          }

        }else{
          const error= new Error('Semantico', 'No se puede operar  por problemas de tipos del operador', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }
      }else if(this.Operador=='%'){
        if(derresultado==0){
          const error= new Error('Semantico', 'No se puede operar porque el operador derecho es 0', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
        }else{
          if(this.izquierda.type.type==types.NUMERIC&&this.derecha.type.type==types.NUMERIC){
            this.type = new Type(types.NUMERIC);
            return izqresultado % derresultado;
          }else{
            const error= new Error('Semantico', 'No se puede operar porque uno de los operadores no es un numero', this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
        }
      }
      else{
        const error= new Error('Semantico', 'No existe el operador', this.linea, this.columna);
          tree.errores.push(error);
          tree.console.push(error.toString());
          return error;
      }
    }
  }
}
