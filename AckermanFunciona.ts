//el ackermann me funciona como el del primer archivo que subio Pavel y así no se tarda

function ackermann( m:number,  n:number):number {
  if (m == 0) {
      return (n + 1);
  } else if ((m > 0) && (n == 0)) {
       let cuatro:number = ackermann(m - 1, 1);
      return cuatro;
  } else {
      let ret:number =  ackermann(m, n - 1);
      let  nueva:number = ackermann(m - 1, ret);
      return nueva;
  }

}
}
console.log("--------------SALIDA ACKERMAN 3,7--------------");
console.log(ackermann(3, 7)); //1021