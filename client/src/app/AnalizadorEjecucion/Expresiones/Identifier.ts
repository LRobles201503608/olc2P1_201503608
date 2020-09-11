import {Tree} from '../Simbols/Tree';
import {Table} from '../Simbols/Table';
import {Error} from '../util/Errors';
import {Node} from '../Abstract/Node';
import {Type,types} from '../util/Types';
import {Simbol} from '../Simbols/Simbol';

export class Identifier extends Node{

  iden:String;

  constructor(iden: String, linea: number, columna: number) {
    super(null, linea, columna); // no se le agrega un tipo porque aun no lo tiene
    this.iden = iden;
}

  execute(table: Table, tree: Tree) {
    let variable:Simbol;
    variable = table.getVariable(this.iden);
    if(variable==null){
      const error= new Error('Semantico', 'No se puede encontrar la variable', this.linea, this.columna);
      tree.errores.push(error);
      tree.console.push(error.toString());
      return error;
    }
    this.type=variable.type;
    return variable.value;
  }

}
