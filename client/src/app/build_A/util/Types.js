"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.types = void 0;
var types;
(function (types) {
    types[types["NUMERIC"] = 0] = "NUMERIC";
    types[types["STRING"] = 1] = "STRING";
    types[types["BOOLEAN"] = 2] = "BOOLEAN";
    types[types["VOID"] = 3] = "VOID";
})(types = exports.types || (exports.types = {}));
;
// AQUI SE VAN A LLEVAR EL CONTROL DE LOS TIPOS QUE POSEE EL LENGUAJE
/**
    *El @constructor crea un nuevo tipo
    * @params es el tipo especifico para cada dato o variable
**/
class Type {
    constructor(type) {
        this.type = type;
    }
    toString() {
        if (this.type == types.STRING) {
            return 'string';
        }
        else if (this.type == types.NUMERIC) {
            return 'numeric';
        }
        else if (this.type == types.BOOLEAN) {
            return 'boolean';
        }
    }
}
exports.Type = Type;
