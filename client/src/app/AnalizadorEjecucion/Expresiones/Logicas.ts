import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';
import { Primitivos } from './Primitivos';
import { Identifier } from './Identifier';

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
  traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
    if(this.derecha!=null){
      let izq=this.izquierda.traducir(tabla,tree,cadena,contTemp);
      let der=this.derecha.traducir(tabla,tree,cadena,contTemp);
      if(izq instanceof Error ){
        return izq;
      }
      else if(der instanceof Error ){
        return der;
      }
      if(this.Operador=="||"){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
              tree.generar_3d("||",izq,der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }else{
              let temp=tree.tmpsop.pop();
              tree.generar_3d("||",izq,temp.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }
          }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
              tree.generar_3d("||",izq,der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }else{
              let temp=tree.tmpsop.pop();
              tree.generar_3d("||",temp.toString(),der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }
          }else{
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("||",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
          }
      }else if(this.Operador=="&&"){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d("&&",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
          else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("&&",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d("&&",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("&&",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("&&",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }
    }else{
      if(this.Operador=='!'){
        let izq=this.izquierda.traducir(tabla,tree,cadena,contTemp);
        if(izq instanceof Error ){
          return izq;
        }
          if(this.izquierda instanceof Identifier || this.izquierda instanceof Primitivos){
            tree.generar_3d("!","",izq,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
      }
    }
    //tree.tmpsop=new Array<String>();
    return;
  }
  execute(table: Table, tree: Tree) {
    if(this.derecha==null){
      const izqresult=this.izquierda.execute(table,tree);
      if(izqresult instanceof Error){
        return izqresult;
      }
      //debugger;
      if(this.Operador=='!'){
        this.izquierda.type=new Type(types.BOOLEAN);
        if(this.izquierda.type.type==types.BOOLEAN){
          return !izqresult;
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
      this.izquierda.type=new Type(types.BOOLEAN);
      this.derecha.type=new Type(types.BOOLEAN);
      //debugger;
      //console.log(tree);
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
