import {Node} from "../Abstract/Node";
import {Error} from '../util/Errors'

// esta clase almacena el ast generado y la lista de instrucciones

export class Tree{
    instructions: Array<Node>;
    console: Array<String>;
    errores: Array<Error>;

    constructor(instructions:Array<Node>){
      this.instructions=instructions;
      this.console=new Array<String>();
      this.errores=new Array<Error>();
    }
}
