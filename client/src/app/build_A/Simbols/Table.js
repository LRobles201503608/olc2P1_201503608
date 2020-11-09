"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
// en esta clase vamos a guardar nuestra tabla de simbolos para las variables y funciones
class Table {
    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */
    constructor(Previous) {
        this.Previous = Previous;
        this.Variables = new Map();
        this.hijos = new Array();
    }
    /**
     *
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
    setVariable(simbol) {
        let env;
        if (simbol.value instanceof Table) {
            env = simbol.value;
        }
        else {
            env = this;
        }
        for (let key of Array.from(env.Variables.keys())) {
            if (key === simbol.identifier) {
                return `La variable ${key} ya ha sido declarada.`;
            }
        }
        this.Variables.set(simbol.identifier, simbol);
        return null;
    }
    /**
     *
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */
    getVariable(identifier) {
        let env;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === identifier) {
                    return env.Variables.get(key);
                }
            }
        }
        return null;
    }
}
exports.Table = Table;
