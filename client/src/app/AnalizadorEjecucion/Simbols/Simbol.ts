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
    posh:number;
    poss:number;
    entorno:number;
    fila:number;
    columna:number;

    iniciostring:number;
    finstring:number;
    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param type Tipo de la varible o funcion
     * @param identifier Nombre de la variable o funcion
     * @param value Valor de la variable u objeto completo de la función
     * @param editable valor para ver si se puede editar la variable o no
     * @param instrucFunc arreglo que tiene las instrucciones de las funciones
     * @param parameters arreglo que tiene los parametros
     */
    constructor(type: Type, identifier: String, value: Object,editable:Boolean,instrucFunc:Array<Node>,parameters:Array<Node>,fila:number,columna:number) {
        this.type = type;
        this.identifier = identifier;
        this.value = value;
        this.editable=editable;
        this.insfunc=instrucFunc;
        this.parameters=parameters;
        this.posh=0;
        this.poss=0;
        this.entorno=0;
        this.fila=fila;
        this.columna=columna;
        this.iniciostring=0;
        this.finstring=0;
    }
}
