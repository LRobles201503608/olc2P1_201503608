"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.types = void 0;
/**
 * @enum que contiene los tipos que pueden venir
 */
var types;
(function (types) {
    types[types["NUMERIC"] = 0] = "NUMERIC";
    types[types["STRING"] = 1] = "STRING";
    types[types["BOOLEAN"] = 2] = "BOOLEAN";
    types[types["VOID"] = 3] = "VOID";
    types[types["ANY"] = 4] = "ANY";
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
        else if (this.type == types.VOID) {
            return 'void';
        }
        else if (this.type == types.ANY) {
            return 'any';
        }
    }
}
exports.Type = Type;
