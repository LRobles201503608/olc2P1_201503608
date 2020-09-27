import {Node} from "../Abstract/Node";
import { Simbol } from "../Simbols/Simbol";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Type , types} from "../util/Types";

/*
* Esta clase imprime los ambientes
*/
export class GraficarTS extends Node{
  constructor(linea:number,col:number){
    super(new Type(types.VOID),linea,col,true);
  }

  execute(table: Table, tree: Tree):any{
    let global=table;

    while(global.Previous!=null){
      global=global.Previous;
    }
    //debugger;
    global.setVariable(new Simbol(null,"global201503608",table,true,null,null));

    let entorno=table.getVariable("global201503608");
    if(entorno==null){
    }
    else{
      let dato:any=entorno.value;
      console.log(dato);
      //debugger;
      let filas_e = "";
      if(dato instanceof Table){
        while(dato!=null){
          if(dato.Previous==null){
            filas_e += "<tr ><td>ENTORNO GLOBAL</td></tr>";
          }else{
            filas_e += "<tr ><td>ENTORNO ANTERIOR</td></tr>";
          }
          dato.Variables.forEach(element => {
            if(element.identifier=="global201503608"){
              //console.log(element);
            }else{
              console.log(element);
              console.log(element.type.type);
              if(element.type!=null){
                if(element.type.type==0){
                  filas_e += "<tr ><td>Numeric</td>";
                }else if(element.type.type==1){
                  filas_e += "<tr ><td>String</td>";
                }else if(element.type.type==2){
                  filas_e += "<tr ><td>Boolean</td>";
                }else if(element.type.type==3){
                  filas_e += "<tr ><td>Void</td>";
                }
                filas_e += "<td>"+element.identifier+"</td>"+"<td>"+element.value+"</td></tr>";
              }
            }
          });
          dato=dato.Previous;
        }
      }
      tree.repent.push(filas_e);
    }
    return null;
  }

}
