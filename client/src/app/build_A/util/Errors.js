"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(tipo, descripcion, linea, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    toString() {
        return `Tipo: ${this.tipo}. Descripcion: ${this.descripcion}. Linea:${this.linea}. Columna: ${this.columna}`;
    }
}
exports.Error = Error;
