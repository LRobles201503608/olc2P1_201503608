import {Node} from "../Abstract/Node";
import {Error} from '../util/Errors'
import { Contenido } from "./Contenido";
import { Table } from "./Table";

/**
 * esta @clase almacena el ast generado y la lista de instrucciones
 * */

export class Tree{
  /**
   * @globalofensive sirve para hacer referencia a la tabla con el ambito global
   */
    instructions: Array<Node>;
    console: Array<String>;
    errores: Array<Error>;
    repent:Array<String>;
    cabecera:Array<String>;
    traduccion:Array<String>;
    globalofensive:Table;

    registroTemporales:Array<Contenido>

    tmpsop:Array<String>;
    tmplis:Array<String>;
    operatemp:Array<String>;
    //variables para el control del c3d
    codigo3D : string;
    aux3D : string;
    temp: number;
    etiqueta: number;
    posh:number;
    poss:number;

    constructor(instructions:Array<Node>){
      this.instructions=instructions;
      this.console=new Array<String>();
      this.errores=new Array<Error>();
      this.repent=new Array<String>();
      this.cabecera=new Array<String>();
      this.traduccion=new Array<String>();
      this.tmpsop=new Array<String>();
      this.operatemp=new Array<String>();

      this.tmplis=new Array<String>();
      this.registroTemporales=new Array<Contenido>();

      this.codigo3D="";
      this.aux3D="";
      this.temp=0;
      this.etiqueta=0;
      this.posh=0;
      this.poss=0;
    }
    setTable(table:Table){
      this.globalofensive=table;
    }
    setHeader(){
      //crea las primeras lineas del  encabezado pero no las temporales,
      // esas se definen luego
      let cadenainicial="";
      cadenainicial+="#include <stdio.h>\ndouble heap[1638400]={-1}; \ndouble stack[1639400]={-1}; \ndouble p=0; \ndouble h=0;\n";
      this.cabecera.push(cadenainicial);
    }
    public setTemporalesHeader(){
      let cadenainicial="double ";
      for(let i=0;i<=this.temp;i++){
        if(i==this.temp){
          cadenainicial+="t"+i+";";
        }else{
          cadenainicial+="t"+i+",";
        }
      }
      return cadenainicial;
    }
     //operaciones con los temporales durante la generacion del codigo
     public getPrevTemp(n:number){ return "t" + (this.temp-n); }//retorna el temporal generado n veces antes

    public lastTemp(){
      return "t"+(this.temp-1);
    }
     //generacion de etiquetas durante la generacion del codigo
     public getEtq(){
         var etiqueta = this.etiqueta;
         this.etiqueta++;
         return "L" + etiqueta;
     }

     public generar_3d(op:string, arg1:string, arg2:string, destino:string) {
       let res=destino + ' = ' + arg1 + ' ' + op + ' ' + arg2 + ';\n';
       this.traduccion.push(res);
      return res;
      }
      public modificar_stack(indice:string, destino:string) {
          let res= 'stack[' + indice + '] = ' + destino + ';\n';
          this.traduccion.push(res);
          return res;
      }
      public modificar_heap(indice:string, destino:string) {
        let res= 'heap[' + indice + '] = ' + destino + ';\n';
        this.traduccion.push(res);
        return res;
    }

      public obtener_puntero_h(destino:string) {
          return destino + ' = H;\n';
      }

      public generar_asignacion(origen:string, destino:string) {
        return destino + ' = ' + origen + ';\n';
      }

      public obtener_stack(indice:string, destino:string) {

          let res= destino + ' = stack[' + indice + '];\n';
          this.traduccion.push(res);
          return destino;
      }
      public obtener_Heap(indice:string, destino:string) {
        let res= destino + ' = heap[' + indice + '];\n';
        this.traduccion.push(res);
        return destino;
    }
    public generarIFC3D(condicion:string,gotosi:string,gotono:string){
      let res = "if("+condicion+") goto "+gotosi+";\n goto"+gotono+";";
      this.traduccion.push(res);
      return res;
    }
}
