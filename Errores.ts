/** 0.4 puntos por error semantico reportado ***/
// acá solo dejé los errores que no validé 
let x = 5 / 0; //Error 1
let zzz = 5 % 0; //Error 2

let y = 20;
const y = 30; //Error 3
let arreglo [] = [1,2,3];
arreglo[0] = "hola"; //Error 7

if(true){
    let noexistoafuera = 100;
}
console.log(noexistoafuera); //Error 8

let tipo1 = "hola";
tipo1 = 100; //Error 9
