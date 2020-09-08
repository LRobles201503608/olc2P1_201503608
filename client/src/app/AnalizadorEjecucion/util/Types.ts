export enum types {
  NUMERIC,
  STRING,
  BOOLEAN,
  VOID
};

// AQUI SE VAN A LLEVAR EL CONTROL DE LOS TIPOS QUE POSEE EL LENGUAJE
/**
    *El @constructor crea un nuevo tipo
    * @params es el tipo especifico para cada dato o variable
**/
export class Type{
    type:types;

    constructor(type:types){
      this.type=type;
    }
    toString(){
      if(this.type==types.STRING){
        return 'string';
      } else if(this.type==types.NUMERIC){
        return 'numeric';
      } else if (this.type==types.BOOLEAN){
        return 'boolean'
      }
    }
}
