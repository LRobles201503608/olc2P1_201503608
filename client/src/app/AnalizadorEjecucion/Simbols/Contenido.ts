export class Contenido{

  posicions:number;
  temporal:String;
  posicionh:Array<number>;
  constructor(posicion:number,temp:String){
    this.posicions=posicion;
    this.temporal=temp;
    this.posicionh=new Array<number>();
  }
}
