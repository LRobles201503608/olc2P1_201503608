export class Error{
  tipo:string;
  descripcion:string;
  linea:number;
  columna:number;

  constructor(tipo:string, descripcion:string, linea:number, columna:number){
    this.tipo=tipo;
    this.descripcion=descripcion;
    this.linea=linea;
    this.columna=columna;
  }
  toString(){
    return `Tipo: ${this.tipo}. Descripcion: ${this.descripcion}. Linea:${this.linea}. Columna: ${this.columna}`;
  }
}
