import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';
import { Relacional } from './Relacional';
import { Logica } from './Logicas';
import { LlamadaFuncion } from '../Instruccion/LlamadaFuncion';
import { Lengths } from '../Instruccion/Length';
import { Primitivos } from './Primitivos';
import { Identifier } from './Identifier';
import { Strings } from './Strings';

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
    super(null,linea,columna,true);
    this.izquierda=izquierda;
    this.derecha=derecha;
    this.Operador=operador;
  }
  traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
    //debugger;
    if(this.derecha!=null){
      let fin1=0;
      let inicio1=0;
      let inicio2=0;
      let fin2=0;
      let izq=this.izquierda.traducir(tabla,tree,cadena,contTemp);
      inicio1=tree.inicioStringHeap;
      fin1=tree.finStringHeap;
      let der=this.derecha.traducir(tabla,tree,cadena,contTemp);
      inicio2=tree.inicioStringHeap;
      fin2=tree.finStringHeap;
      if(izq instanceof Error ){
        return izq;
      }
      else if(der instanceof Error ){
        return der;
      }
      if(this.Operador=="+"){
        debugger;
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
              tree.generar_3d("+",izq,der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }else if(this.derecha instanceof Strings){
              let valor=this.izquierda.execute(tabla,tree);
                let pos =inicio2;
                let posh= tree.posh;
                let val2=valor.toString();
                let va=0;
                for(let a=0;a<val2.length;a++){
                  va=val2.charCodeAt(a);
                  tree.modificar_heap(pos.toString(),va.toString());
                  pos++;
                  tree.inicioStringHeap=pos;
                }
                tree.posh=tree.inicioStringHeap;
                this.derecha.traducir(tabla,tree,"",0);
                tree.posh=posh;
                tree.inicioStringHeap=inicio2;
                tree.generar_3d("",inicio1.toString(),"","t"+tree.temp);
                tree.tmpsop.push("t"+tree.temp);
                tree.temp++;
            }else{
              let temp=tree.tmpsop.pop();
              tree.generar_3d("+",izq,temp.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }
          }else if(this.izquierda instanceof Strings){
            if(this.derecha instanceof Primitivos){
                let valor=this.derecha.execute(tabla,tree);
                let pos =fin1+1;
                let val2=valor.toString();
                let va=0;
                for(let a=0;a<val2.length;a++){
                  va=val2.charCodeAt(a);
                  tree.modificar_heap(pos.toString(),va.toString());
                  pos++;
                  tree.finStringHeap=pos;
                }
                tree.generar_3d("",inicio1.toString(),"","t"+tree.temp);
                tree.tmpsop.push("t"+tree.temp);
                tree.temp++;
            }else if(this.derecha instanceof Strings){
              let posh=tree.posh;
              let valor=this.derecha.execute(tabla,tree);
                let pos =fin1+1;
                let val2=valor.toString();
                let va=0;
                for(let a=0;a<val2.length;a++){
                  va=val2.charCodeAt(a);
                  tree.modificar_heap(pos.toString(),va.toString());
                  pos++;
                  tree.finStringHeap=pos;
                }
                tree.inicioStringHeap=inicio1;
                tree.posh=tree.finStringHeap+350;
                tree.generar_3d("",inicio1.toString(),"","t"+tree.temp);
                tree.tmpsop.push("t"+tree.temp);
                tree.temp++;
            }else if(this.derecha instanceof Identifier){

            }
          }else if(this.derecha instanceof Strings){
            if(this.izquierda instanceof Primitivos){
              let valor=this.derecha.execute(tabla,tree);
                let pos =inicio2;
                let val2=valor.toString();
                let va=0;
                for(let a=0;a<val2.length;a++){
                  va=val2.charCodeAt(a);
                  tree.modificar_heap(pos.toString(),va.toString());
                  pos++;
                  tree.inicioStringHeap=pos;
                }

                this.derecha.traducir(tabla,tree,"",0);
                tree.inicioStringHeap=inicio2;
                tree.generar_3d("",inicio1.toString(),"","t"+tree.temp);
                tree.tmpsop.push("t"+tree.temp);
                tree.temp++;
            }
            else if(this.izquierda instanceof Identifier){

            }else{
              let valor=this.izquierda.execute(tabla,tree);
              let pos =inicio2;
              let val2=valor.toString();
              let va=0;
              for(let a=0;a<val2.length;a++){
                va=val2.charCodeAt(a);
                tree.modificar_heap(pos.toString(),va.toString());
                pos++;
                tree.inicioStringHeap=pos;
              }
              debugger;
              let posh=tree.posh;
              tree.posh=pos;
              this.derecha.traducir(tabla,tree,"",0);
              tree.inicioStringHeap=inicio2;
              tree.posh=posh;
              tree.generar_3d("",inicio1.toString(),"","t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }
          }
          else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
              tree.generar_3d("+",izq,der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }else{
              if(this.izquierda instanceof Aritmetica){
                let i=this.izquierda;
                console.log(i);
                if(i.izquierda instanceof Strings || i.derecha instanceof Strings){
                  let posh=tree.posh;
                  let valor=this.derecha.execute(tabla,tree);
                  debugger;
                    let pos =fin1+1;
                    let val2=valor.toString();
                    let va=0;
                    for(let a=0;a<val2.length;a++){
                      va=val2.charCodeAt(a);
                      tree.modificar_heap(pos.toString(),va.toString());
                      pos++;
                      tree.finStringHeap=pos;
                    }
                    tree.inicioStringHeap=inicio1;
                    tree.posh=tree.finStringHeap+350;
                    tree.generar_3d("",inicio1.toString(),"","t"+tree.temp);
                    tree.tmpsop.push("t"+tree.temp);
                    tree.temp++;
                }
              }
              let temp=tree.tmpsop.pop();
              tree.generar_3d("+",temp.toString(),der,"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
            }
          }else{
            if(this.izquierda instanceof Aritmetica){
              let i=this.izquierda;
              console.log(i);
              if(i.izquierda instanceof Strings || i.derecha instanceof Strings){
                let posh=tree.posh;
                let valor=this.derecha.execute(tabla,tree);
                debugger;
                  let pos =fin1+1;
                  let val2=valor.toString();
                  let va=0;
                  for(let a=0;a<val2.length;a++){
                    va=val2.charCodeAt(a);
                    tree.modificar_heap(pos.toString(),va.toString());
                    pos++;
                    tree.finStringHeap=pos;
                  }
                  tree.inicioStringHeap=inicio1;
                  tree.posh=tree.finStringHeap+350;
                  tree.generar_3d("",inicio1.toString(),"","t"+tree.temp);
                  tree.tmpsop.push("t"+tree.temp);
                  tree.temp++;
              }
            }
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("+",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
          }
      }else if(this.Operador=="-"){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d("-",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
          else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("-",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d("-",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("-",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("-",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }else if(this.Operador=="*"){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d("*",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("*",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d("*",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("*",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
              let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("*",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }else if(this.Operador=="/"){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
            tree.generar_3d("/",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("/",izq,temp.toString(),"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
            tree.generar_3d("/",izq,der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }else{
            let temp=tree.tmpsop.pop();
            tree.generar_3d("/",temp.toString(),der,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
        }else{
          let temp1=tree.tmpsop.pop();
              let temp2=tree.tmpsop.pop();
              tree.generar_3d("/",temp2.toString(),temp1.toString(),"t"+tree.temp);
              tree.tmpsop.push("t"+tree.temp);
              tree.temp++;
        }
      }else if(this.Operador=="**"){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){

          }else{

          }
        }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){

          }else{

          }
        }else{

        }
      }else if(this.Operador=="%"){
        if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
          tree.generar_3d("%",izq,der,"t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
        }else{
          let temp=tree.tmpsop.pop();
          tree.generar_3d("%",izq,temp.toString(),"t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
        }
      }else if(this.derecha instanceof Primitivos || this.derecha instanceof Identifier){
        if (this.izquierda instanceof Primitivos || this.izquierda instanceof Identifier){
          tree.generar_3d("%",izq,der,"t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
        }else{
          let temp=tree.tmpsop.pop();
          tree.generar_3d("%",temp.toString(),der,"t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
        }
      }
    }
    else{
      if(this.Operador=='-'){
        debugger;
        let izq=this.izquierda.traducir(tabla,tree,cadena,contTemp);
        if(izq instanceof Error ){
          return izq;
        }
            tree.generar_3d("-","0",izq,"t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
      }else if(this.Operador=='--'){
        let izq=this.izquierda.traducir(tabla,tree,cadena,contTemp);
        if(izq instanceof Error ){
          return izq;
        }
          if(this.izquierda instanceof Identifier){
            tree.generar_3d("-",izq,"1","t"+tree.temp);
            tree.tmpsop.push("t"+tree.temp);
            tree.temp++;
          }
      }else if(this.Operador=='++'){
        let izq=this.izquierda.traducir(tabla,tree,cadena,contTemp);
        if(izq instanceof Error ){
          return izq;
        }
          if(this.izquierda instanceof Identifier){
            tree.generar_3d("+",izq,"1","t"+tree.temp);
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
      if(this.derecha instanceof Relacional|| this.derecha instanceof Logica||this.derecha instanceof LlamadaFuncion||this.derecha instanceof Lengths){
        if(this.derecha.type==null){
          this.derecha.type=new Type(types.NUMERIC);
        }
      }
      if(this.izquierda instanceof Relacional|| this.izquierda instanceof Logica||this.izquierda instanceof LlamadaFuncion||this.izquierda instanceof Lengths){
        if(this.izquierda.type==null){
          this.izquierda.type=new Type(types.NUMERIC);
        }
      }
      if(this.Operador=='+'){
        //debugger;
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
