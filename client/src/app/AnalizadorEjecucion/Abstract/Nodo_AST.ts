import {Type} from '../util/Types';
import { Tree } from '../Simbols/Tree';
import { Table } from '../Simbols/Table';
import { TypeofExpr } from '@angular/compiler';

export abstract class Nodo_AST{

  etiqueta:string;
  children:Nodo_AST[];
  parent:Nodo_AST;

   constructor(etiqueta:string,parent:Nodo_AST,children:Nodo_AST[]){
    this.etiqueta=etiqueta;
    this.parent=parent;
    this.children=children;
   }
}
