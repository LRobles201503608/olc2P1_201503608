import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Simbol } from "../Simbols/Simbol";
import { Aritmetica } from "../Expresiones/Aritmeticas";
import { Relacional } from "../Expresiones/Relacional";
import { Logica } from "../Expresiones/Logicas";
import { Primitivos } from "../Expresiones/Primitivos";
import { Ternario } from "./Ternario";
import {Strings} from "../Expresiones/Strings";
import { LowerCase } from "./StringToLower";
import { UpperCase } from "./StringToUpper";
import { CharAt } from "./CharAt";
import { Lengths } from "./Length";
import {Concat} from './Concat';
import { AccesoArrays } from "./AccessoDimensiones";
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Declaracion extends Node {
    type: Type;
    public identifier: String;
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
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      //debugger;
      let simbol=tabla.getVariable(this.identifier);
      //debugger;
      if(this.value instanceof Ternario){
        if(simbol.entorno==0){
          let posh=tree.posh;
          let destino=tree.tmpsop.pop();
          tree.modificar_heap(posh.toString(),destino.toString());
          simbol.posh=posh;
          tree.posh+=250;
        }else{
          let poss=tree.poss;
          let destino=tree.tmpsop.pop();
          tree.modificar_stack(poss.toString(),destino.toString());
          simbol.poss=poss;
          tree.poss+=250;
        }
      }else if(this.value instanceof AccesoArrays){
        debugger;
        if(simbol.entorno==0){
          let posh=tree.posh;
          let destino=tree.tmpsop.pop();
          tree.modificar_heap(posh.toString(),destino.toString());
          simbol.posh=posh;
          tree.posh+=25;
          simbol.type=new Type(types.NUMERIC);
          return;
        }else{
          let poss=tree.poss;
          let destino=tree.tmpsop.pop();
          tree.modificar_stack(poss.toString(),destino.toString());
          simbol.poss=poss;
          tree.poss+=25;
          simbol.type=new Type(types.NUMERIC);
          return;
        }

      }
      else{
        let a=this.value.traducir(tabla,tree,cadena,contTemp);

      if(a instanceof Error){
        return a;
      }
      if(this.value instanceof Aritmetica||this.value instanceof Relacional||this.value instanceof Logica){
        if(simbol.entorno==0){
          let posh=tree.posh;
          let destino=tree.tmpsop.pop();
          tree.modificar_heap(posh.toString(),destino.toString());
          simbol.posh=posh;
          simbol.iniciostring=tree.inicioStringHeap;
          simbol.finstring=tree.finStringHeap-1;
          tree.posh+=250;
        }else{
          let poss=tree.poss;
          let destino=tree.tmpsop.pop();
          tree.modificar_stack(poss.toString(),destino.toString());
          simbol.poss=poss;
          tree.poss+=250;
        }
      }else if(this.value instanceof Primitivos){
        if(simbol.entorno==0){
          debugger;

          let posh=tree.posh;
          let destino=this.value.traducir(tabla,tree,cadena,contTemp);
          tree.modificar_heap(posh.toString(),destino.toString());
          simbol.posh=posh;
          tree.posh+=250;
        }else{
          let poss=tree.poss;
          let destino=this.value.traducir(tabla,tree,cadena,contTemp);
          tree.modificar_stack(poss.toString(),destino.toString());
          simbol.poss=poss;
          tree.poss+=250;
        }
      }else if(this.value instanceof Strings|| this.value instanceof LowerCase|| this.value instanceof UpperCase|| this.value instanceof CharAt|| this.value instanceof Concat){
        if(this.value instanceof Concat){
          let val=this.value.execute(tabla,tree)+"";
          let inicio=tree.inicioStringHeap;
          let fin=inicio;
          for(let a=0;a<val.length;a++){
            let act=val.charCodeAt(a);
            let sigval=val.charCodeAt(a+1);
            if(act==92){
              if(sigval==110){
                act=10;
                a++;
              }else if(sigval==116){
                act=9;
                a++;
              }else if(sigval==114){
                act=13;
                a++;
              }
            }
            tree.modificar_heap(fin.toString(),act.toString());
            fin++;
          }
          tree.finStringHeap=fin;
        }else if(this.value instanceof CharAt){
          let val=this.value.execute(tabla,tree)+"";
          let val2=val.charCodeAt(0);
          tree.generar_3d("",val2.toString(),"","t"+tree.temp);
          tree.modificar_heap(tree.posh+"","t"+tree.temp);
          simbol.iniciostring=tree.posh;
          simbol.finstring=tree.posh;
          tree.posh+=200;
          tree.temp++;
          return;
        }

        simbol.iniciostring=tree.inicioStringHeap;
        simbol.finstring=tree.finStringHeap;
        simbol.type=new Type(types.STRING);

      }else if(this.value instanceof Lengths){
        debugger;
        if(simbol.entorno==0){
          let posh=tree.posh;
          let destino=this.value.traducir(tabla,tree,cadena,contTemp);
          tree.modificar_heap(posh.toString(),destino.toString());
          simbol.posh=posh;
          tree.posh+=250;
        }else{
          let poss=tree.poss;
          let destino=this.value.traducir(tabla,tree,cadena,contTemp);
          tree.modificar_stack(poss.toString(),destino.toString());
          simbol.poss=poss;
          tree.poss+=250;
        }
      }
    }
      return;
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
              if(this.value instanceof Strings|| this.value instanceof LowerCase|| this.value instanceof UpperCase|| this.value instanceof CharAt){
                this.type = new Type(types.STRING);
              }else{
                this.type = new Type(types.NUMERIC);
              }

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
          simbol = new Simbol(this.type, this.identifier, result, this.edit,null,null,this.linea,this.columna);
          let global=tree.globalofensive;
          if(table==global){
            simbol.entorno=0;
          }else{
            simbol.entorno=1;
          }
          const res = table.setVariable(simbol);
          if (res != null) {
              const error = new Error('Semantico', res, this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
          }
          this.traducir(table,tree,"",0);
          return null;
    }
}
