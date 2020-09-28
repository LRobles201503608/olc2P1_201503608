import {Node} from "../Abstract/Node";
import {Error} from '../util/Errors'
import { Table } from "./Table";

/**
 * esta @clase almacena el ast generado y la lista de instrucciones
 * */

export class Tree{
  /**
   * @globalofensive sirve para hacer referencia a la tabla con el ambito global
   */
    instructions: Array<Node>;
    console: Array<String>;
    errores: Array<Error>;
    repent:Array<String>;
    globalofensive:Table;
    constructor(instructions:Array<Node>){
      this.instructions=instructions;
      this.console=new Array<String>();
      this.errores=new Array<Error>();
      this.repent=new Array<String>();
    }
    setTable(table:Table){
      this.globalofensive=table;
    }
}
