import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Simbol } from "../Simbols/Simbol";
import { Primitivos } from "../Expresiones/Primitivos";
import { Strings } from "../Expresiones/Strings";
import { LowerCase } from "./StringToLower";
import { UpperCase } from "./StringToUpper";
import { CharAt } from "./CharAt";
import { Concat } from "./Concat";
import { Lengths } from "./Length";
import { Ternario } from "./Ternario";
import { AccesoArrays } from "./AccessoDimensiones";

/**
 * @class Reasigna el valor de una variable existente
 */
export class Asignacion extends Node {
    identifier: String;
    value: Node;

    /**
     * @constructor Crea el nodo instruccion para la sentencia Asignacion
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(identifier: String, value: Node, line: number, column: number, editable:Boolean) {
        super(null, line, column,editable);
        this.identifier = identifier;
        this.value = value;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      let a=this.value.traducir(tabla,tree,cadena,contTemp);
      let simbol=tabla.getVariable(this.identifier);
      //debugger;
      if(a instanceof Error){
        return a;
      }
      if(this.value instanceof Ternario){
        debugger;
        if(simbol.entorno==0){
          let posh=simbol.posh;
          let destino=tree.tmpsop.pop();
          tree.modificar_heap(posh.toString(),destino.toString());
          simbol.posh=posh;
          return;
        }else{
          let poss=simbol.poss;
          let destino=tree.tmpsop.pop();
          tree.modificar_stack(poss.toString(),destino.toString());
          simbol.poss=poss;
          return;
        }
      }else if(this.value instanceof AccesoArrays){
        debugger;
        if(simbol.entorno==0){
          let posh=simbol.posh;
          let destino=tree.tmpsop.pop();
          tree.modificar_heap(posh.toString(),destino.toString());
          simbol.posh=posh;
          simbol.type=new Type(types.NUMERIC);
          return;
        }
      }

      if(simbol.entorno==0){
        if(this.value instanceof Ternario){
          if(simbol.entorno==0){

            let posh=simbol.posh;
            let destino=tree.tmpsop.pop();
            tree.modificar_heap(posh.toString(),destino.toString());
            simbol.posh=posh;
          }else{
            let poss=simbol.poss;
            let destino=tree.tmpsop.pop();
            tree.modificar_stack(poss.toString(),destino.toString());
            simbol.poss=poss;
          }
        }
        else if(this.value instanceof Primitivos){
          tree.generar_3d("",simbol.posh.toString(),"","t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
          //debugger;
          let posi:String=tree.tmpsop.pop();
          let stackk= tree.modificar_heap("(int)"+posi.toString(),a.toString());
        }else if(this.value instanceof Strings|| this.value instanceof LowerCase|| this.value instanceof UpperCase|| this.value instanceof CharAt|| this.value instanceof Concat){
          let fin=simbol.finstring;
          if(this.value instanceof Concat){
            let val=this.value.execute(tabla,tree)+"";
            let inicio=simbol.iniciostring;
            fin=inicio;
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
            simbol.finstring=fin;
            simbol.type=new Type(types.STRING);
          }else if(this.value instanceof CharAt){
            let val=this.value.execute(tabla,tree)+"";
            let val2=val.charCodeAt(0);
            tree.generar_3d("",val2.toString(),"","t"+tree.temp);
            tree.modificar_heap(tree.posh+"","t"+tree.temp);
            tree.temp++;
            return;
          }
        }
        else if(this.value instanceof Lengths){
          debugger;
          if(simbol.entorno==0){
            let posh=simbol.posh;
            let destino=this.value.traducir(tabla,tree,cadena,contTemp);
            tree.modificar_heap(posh.toString(),destino+"");
            simbol.posh=posh;
          }
        }else{
          simbol.iniciostring=tree.inicioStringHeap;
          simbol.finstring=tree.finStringHeap;
          tree.generar_3d("",simbol.posh.toString(),"","t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
          //debugger;
          let posi:String=tree.tmpsop.pop();
          let stackk= tree.modificar_heap("(int)"+posi.toString(),tree.tmpsop.pop().toString());
          tree.temp++;
        }
      }else{
        if(this.value instanceof Ternario){
          if(simbol.entorno==0){
            let posh=simbol.posh;
            let destino=tree.tmpsop.pop();
            tree.modificar_heap(posh.toString(),destino.toString());
            simbol.posh=posh;
          }else{
            let poss=simbol.poss;
            let destino=tree.tmpsop.pop();
            tree.modificar_stack(poss.toString(),destino.toString());
            simbol.poss=poss;
          }
        }else if(this.value instanceof Primitivos){
          tree.generar_3d("",simbol.posh.toString(),"","t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
          //debugger;
          let posi:String=tree.tmpsop.pop();
          let stackk= tree.modificar_stack("(int)"+posi.toString(),a.toString());
          tree.temp++;
        }else if(this.value instanceof Strings|| this.value instanceof LowerCase|| this.value instanceof UpperCase|| this.value instanceof CharAt|| this.value instanceof Concat){
          let fin=simbol.finstring;
          if(this.value instanceof Concat){
            let val=this.value.execute(tabla,tree)+"";
            let inicio=simbol.iniciostring;
            fin=inicio;
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
            simbol.finstring=fin;
            simbol.type=new Type(types.STRING);
          }else if(this.value instanceof CharAt){
            let val=this.value.execute(tabla,tree)+"";
            let val2=val.charCodeAt(0);
            tree.generar_3d("",val2.toString(),"","t"+tree.temp);
            tree.modificar_heap(tree.posh+"","t"+tree.temp);
            tree.temp++;
            return;
          }
        }
        else if(this.value instanceof Lengths){
          debugger;
          if(simbol.entorno==0){
            let posh=simbol.posh;
            let destino=this.value.traducir(tabla,tree,cadena,contTemp);
            tree.modificar_heap(posh.toString(),destino+"");
            simbol.posh=posh;
          }
        }
        else{
          simbol.iniciostring=tree.inicioStringHeap;
          simbol.finstring=tree.finStringHeap;
          tree.generar_3d("",simbol.poss.toString(),"","t"+tree.temp);
          tree.tmpsop.push("t"+tree.temp);
          tree.temp++;
          //debugger;
          let posi:String=tree.tmpsop.pop();
          let stackk= tree.modificar_stack("(int)"+posi.toString(),tree.tmpsop.pop().toString());
          tree.temp++;
        }
      }
      return;
    }
    execute(table: Table, tree: Tree) {
        const result = this.value.execute(table, tree);
        if (result instanceof Error) {
            return result;
        }
        let variable: Simbol;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Error('Semantico', 'No se ha encontrado la variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (variable.type==null){
          if(this.value.type!=null){
            this.type = new Type(this.value.type.type);
          }else{
            this.type = new Type(types.NUMERIC);
          }
          variable.value = result;
          return null;
        }
        if(this.value.type!=null){
          if (this.value.type.type != variable.type.type) {
            const error = new Error('Semantico', `No se puede asignar la variable porque los tipos no coinciden.`, this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
          }
          if(variable.editable==false){
            const error = new Error('Semantico', `No se puede asignar a la variable porque es una constante.`, this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
              return error;
          }
        }
        variable.value = result;
        this.traducir(table,tree,"",0);
        return null;
    }
}
