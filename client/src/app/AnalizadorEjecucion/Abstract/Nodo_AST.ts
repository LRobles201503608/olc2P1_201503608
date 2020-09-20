import {Type} from '../util/Types';
import { Tree } from '../Simbols/Tree';
import { Table } from '../Simbols/Table';
import { TypeofExpr } from '@angular/compiler';

export abstract class Nodo_AST{

  name:string;
  children:Nodo_AST[];
  parent:Nodo_AST;

   constructor(name:string,parent:Nodo_AST,children:Nodo_AST[]){
    this.name=name;
    this.parent=parent;
    this.children=children;
   }
}
