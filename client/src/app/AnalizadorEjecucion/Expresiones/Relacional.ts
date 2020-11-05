import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';
import { Primitivos } from './Primitivos';
import { Identifier } from './Identifier';

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
    super(null,linea,columna,true);
      this.izquierda=izquierda;
      this.derecha=derecha;
      this.Operador=operador;
  }
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
      if(this.Operador=="<"){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
              tree.generar_3d("<",izq,der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }else{
              let temp=tree.tmpsop.pop();
              tree.generar_3d("<",izq,temp.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }
          }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
              tree.generar_3d("<",izq,der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }else{
              let temp=tree.tmpsop.pop();
              tree.generar_3d("<",temp.toString(),der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }
          }else{
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("<",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
          }
      }else if(this.Operador==">"){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d(">",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
          else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d(">",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d(">",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d(">",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d(">",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }else if(this.Operador=="<="){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d("<=",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("<=",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d("<=",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("<=",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("<=",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }else if(this.Operador==">="){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d(">=",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d(">=",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d(">=",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d(">=",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
          let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d(">=",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }else if(this.Operador=="=="){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d("==",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("==",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d("==",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("==",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
          let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("==",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }else if(this.Operador=="!="){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d("!=",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("!=",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d("!=",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("!=",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
          let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("!=",temp2.toString(),temp1.toString(),"t"+tree.temp);
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
          const error= new Error('Semantico', 'Se necesita del operador derecho', this.linea, this.columna);
          tree.errores.push(error);
          //tree.console.push(error.toString());
          return error;
      }else{
        const izqresultado= this.izquierda.execute(table,tree);
        const derresultado= this.derecha.execute(table,tree);
        //console.log(tree);
        //debugger;
        if(izqresultado instanceof Error){
          return izqresultado;
        }
        if(derresultado instanceof Error){
          return derresultado;
        }
        //debugger;
        if(this.derecha.type==null){
            if(this.Operador=="<"||this.Operador=="<="||this.Operador==">"||this.Operador==">="){
              this.derecha.type=new Type(types.NUMERIC);
            }
        }
        if(this.izquierda.type==null){
          if(this.Operador=="<"||this.Operador=="<="||this.Operador==">"||this.Operador==">="){
            this.izquierda.type=new Type(types.NUMERIC);
          }
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
