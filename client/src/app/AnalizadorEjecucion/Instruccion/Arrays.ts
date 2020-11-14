import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types, Type } from "../util/Types";
import { Simbol } from "../Simbols/Simbol";
import { Primitivos } from "../Expresiones/Primitivos";
import { Identifier } from "../Expresiones/Identifier";

/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
export class Arrays extends Node {
    guardaditoHiperChingon:any=[];
    cantidadDimensionesMamalona=0;

    type: Type;
    identifier: String;
    value: Array<Node>;
    edit:Boolean;
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param identifier nombre de la variable
     * @param value valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(type: Type, identifier: String, value: Array<Node>, line: number, column: number,editable:Boolean) {
        super(type, line, column,editable);
        this.identifier = identifier;
        this.value = value;
        this.edit=editable;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      let variable: Simbol;
        variable = tabla.getVariable(this.identifier);
        if (variable == null) {
            const error = new Error('Semantico', 'No se ha encontrado la variable ' + this.identifier,this.linea, this.columna);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let repos=0;
        let newdimen=0;
        if(this.cantidadDimensionesMamalona==1){
          let tam=variable.value.length;
          let inicio=tree.posh;
          let fin=inicio;
          for(let a=0;a<tam;a++){
            let act=variable.value[a];
            if(act.toString()=="true"){
              act=1;
            }else if(act.toString()=="false"){
              act=0;
            }
            tree.modificar_heap(fin+"",act+"");
            fin++;
          }
          variable.iniciostring=inicio;
          variable.finstring=(fin-1);
          tree.posh=fin+25;
        }else if(this.cantidadDimensionesMamalona==2){
          let tam=variable.value.length;
          let inicio=tree.posh;
          let fin=inicio;
          for(let a=0;a<tam;a++){
            let tam2=variable.value[a].length;
            newdimen=tam*tam2;
            fin=newdimen;
            for(let b=0;b<tam2;b++){
              let act=variable.value[a][b];
              if(act.toString()=="true"){
                act=1;
              }else if(act.toString()=="false"){
                act=0;
              }
              repos=((a-0)*tam2)+b
              tree.modificar_heap(repos+"",act+"");
            }
          }
          variable.iniciostring=inicio;
          variable.finstring=(fin-1);
          tree.posh=fin+25;
        }else if(this.cantidadDimensionesMamalona==3){
          let tam=variable.value.length;
          let inicio=tree.posh;
          let fin=inicio;
          for(let a=0;a<tam;a++){
            let tam2=variable.value[a].length;
            newdimen=tam*tam2;
            fin=newdimen;
            for(let b=0;b<tam2;b++){
              let tam3=variable.value[a][b].length;
              newdimen=tam*tam2*tam3;
              fin=newdimen;
              for(let c=0;c<tam3;c++){
                //debugger;
                let act=variable.value[a][b][c];
                if(act.toString()=="true"){
                  act=1;
                }else if(act.toString()=="false"){
                  act=0;
                }
                repos=((((a-0)*tam2)+b)*tam3)+c;
                tree.modificar_heap(repos+"",act+"");
              }

            }
          }
          variable.iniciostring=inicio;
          variable.finstring=(fin-1);
          tree.posh=fin+25;
        }
    }
    execute(table: Table, tree: Tree) {
      this.llenadoArreglo(table,tree,this.value);
      //debugger;
      let simbol;
          simbol = new Simbol(this.type, this.identifier, this.guardaditoHiperChingon, this.edit,null,null,this.linea,this.columna);
          const res = table.setVariable(simbol);
          this.traducir(table,tree,"",0)
          if (res != null) {
              const error = new Error('Semantico', res, this.linea, this.columna);
              tree.errores.push(error);
              tree.console.push(error.toString());
          }
    }

    llenadoArreglo(table: Table, tree: Tree,value: Array<Node>){
        for (let a = 0; a < this.value.length; a++) {
         const element = value[a];
         if(element instanceof Primitivos || element instanceof Identifier){
            let val = element.execute(table,tree);
            this.guardaditoHiperChingon.push(val);
            //console.log(this.guardaditoHiperChingon);
            this.cantidadDimensionesMamalona=1;
         }else{
           let arre=[];
           for (let b = 0; b < element.length; b++) {
             const element2 = element[b];
             if(element2 instanceof Primitivos || element2 instanceof Identifier){
              arre.push(element2.execute(table,tree));
              this.cantidadDimensionesMamalona=2;
              //console.log(arre);
             }else{
              let arre2=[];
              for (let c = 0; c < element2.length; c++) {
                const element3 = element2[c];
                if(element3 instanceof Primitivos || element3 instanceof Identifier){
                  arre2.push(element3.execute(table,tree));
                  this.cantidadDimensionesMamalona=3;
                  //console.log(arre2);
                 }else{
                   let arre3=[];
                   for (let d = 0; d < element3.length; d++) {
                     const element4 = element3[d];
                     if(element4 instanceof Primitivos || element4 instanceof Identifier){
                      arre3.push(element4.execute(table,tree));
                      this.cantidadDimensionesMamalona=4;
                      //console.log(arre3);
                     }else{
                      let arre4=[];
                      for (let e = 0; e < element4.length; e++) {
                        const element5 = element4[e];
                        if(element5 instanceof Primitivos || element5 instanceof Identifier){
                          arre4.push(element5.execute(table,tree));
                          //console.log(arre4);
                         }else{
                           let arre5=[];
                           for (let f = 0; f < element5.length; f++) {
                             const element6 = element5[f];
                             if(element6 instanceof Primitivos || element6 instanceof Identifier){
                              arre5.push(element6.execute(table,tree));
                              //console.log(arre4);
                             }else{
                               let arre6=[];
                               for (let g = 0; g < element6.length; g++) {
                                 const element7 = element6[g];
                                 if(element7 instanceof Primitivos || element7 instanceof Identifier){
                                  arre6.push(element7.execute(table,tree));
                                  //console.log(arre4);
                                 }
                               }
                               arre5.push(arre6);
                             }
                           }
                           arre4.push(arre5);
                         }
                      }
                      arre3.push(arre4);
                     }
                   }
                   arre2.push(arre3);
                 }
              }
              arre.push(arre2);
             }
           }
           this.guardaditoHiperChingon.push(arre);
         }
         console.log(this.guardaditoHiperChingon);
        }
    }
}
