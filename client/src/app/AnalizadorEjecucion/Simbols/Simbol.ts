import { Node } from "../Abstract/Node";
import {Type} from "../util/Types";

/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones
 */

export class Simbol {
    type: Type;
    identifier: String
    value: Object
    editable:Boolean;
    insfunc:Array<Node>;
    parameters:Array<Node>;
    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param type Tipo de la varible o funcion
     * @param identifier Nombre de la variable o funcion
     * @param value Valor de la variable u objeto completo de la función
     */
    constructor(type: Type, identifier: String, value: Object,editable:Boolean,instrucFunc:Array<Node>,parameters:Array<Node>) {
        this.type = type;
        this.identifier = identifier;
        this.value = value;
        this.editable=editable;
        this.insfunc=instrucFunc;
        this.parameters=parameters;
    }
}
