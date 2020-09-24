import {Simbol} from './Simbol';

// en esta clase vamos a guardar nuestra tabla de simbolos para las variables y funciones

export class Table{
  Previous: Table;
    Variables: Map<String, Simbol>;

    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */
    constructor(Previous: Table){
        this.Previous = Previous;
        this.Variables = new Map<String, Simbol>();
    }

    /**
     *
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
    setVariable(simbol: Simbol){
      let env: Table;
      if(simbol.value instanceof Table){
        env=simbol.value;
      }else{
        env=this;
      }

          for(let key of Array.from( env.Variables.keys()) ) {
              if(key === simbol.identifier){
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
    getVariable(identifier: String): Simbol{
        let env: Table;
        for(env = this; env != null; env = env.Previous){
            for(let key of Array.from( env.Variables.keys()) ) {
                if(key === identifier){
                    return env.Variables.get(key);
                }
            }
        }
        return null;
    }

}
