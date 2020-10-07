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

    execute(table: Table, tree: Tree) {
      this.llenadoArreglo(table,tree,this.value);
      let simbol;
          simbol = new Simbol(this.type, this.identifier, this.guardaditoHiperChingon, this.edit,null,null);
          const res = table.setVariable(simbol);
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
         }else{
           let arre=[];
           for (let b = 0; b < element.length; b++) {
             const element2 = element[b];
             if(element2 instanceof Primitivos || element2 instanceof Identifier){
              arre.push(element2.execute(table,tree));
              //console.log(arre);
             }else{
              let arre2=[];
              for (let c = 0; c < element2.length; c++) {
                const element3 = element2[c];
                if(element3 instanceof Primitivos || element3 instanceof Identifier){
                  arre2.push(element3.execute(table,tree));
                  //console.log(arre2);
                 }else{
                   let arre3=[];
                   for (let d = 0; d < element3.length; d++) {
                     const element4 = element3[d];
                     if(element4 instanceof Primitivos || element4 instanceof Identifier){
                      arre3.push(element4.execute(table,tree));
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
