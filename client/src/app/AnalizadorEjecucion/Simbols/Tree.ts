import {Node} from "../Abstract/Node";

// esta clase almacena el ast generado y la lista de instrucciones

export class Tree{
    instructions: Array<Node>;
    console: Array<String>;

    constructor(instructions:Array<Node>){
      this.instructions=instructions;
      this.console=new Array<String>();
    }
}
