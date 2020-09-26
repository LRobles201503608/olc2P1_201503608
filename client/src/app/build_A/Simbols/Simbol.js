"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbol = void 0;
/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones
 */
class Simbol {
    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param type Tipo de la varible o funcion
     * @param identifier Nombre de la variable o funcion
     * @param value Valor de la variable u objeto completo de la función
     */
    constructor(type, identifier, value, editable, instrucFunc, parameters) {
        this.type = type;
        this.identifier = identifier;
        this.value = value;
        this.editable = editable;
        this.insfunc = instrucFunc;
        this.parameters = parameters;
    }
}
exports.Simbol = Simbol;
