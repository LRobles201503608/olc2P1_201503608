let relacionales: number = 0;
let logicas: number = 0;
let aritmeticas: number = 0; //Descomentar despues de reportar el error
//const aritmeticas: number = 0; //Comentar despues de reportar el error
//aritmeticas = 100;
if (true == true && false != false && true != true && false == false) {
    console.log("R// AND con booleanos incorrecto");
} else {
    logicas = logicas + 0.5;
}
if (1 == 1 && 10 != 100 && 30 != 20 && 1200 == 1200) {
    logicas = logicas + 0.5;
} else {
    console.log("R// And con number incorrecto");
}
if (false == false && true == false && 5 * 5 == (5 * 5)) {
    console.log("R// AND mixto incorrecto");
}
else {
    logicas = logicas + 0.5;
}
if (!!!!!!!!!!!!!!!!!!!!true) {
    logicas = logicas+0.5;
} else {
    console.log("R// NOT incorrecto");
}
let num1: number = (5 * 5 + 2 * 3 * 3) / ((5 *5*5*5* 5) - 2 + (3 * 3));
let num2: number = (5 * 5 + 2 * 3 * 3) / ((5 *5*5*5* 5) - 2 + 3 * 1);
let num3: number = (5 + 5 + 10 + 6 + 9) / ((5 * 2)*(5 * 2));
let num4: number = (5 *5*5*5* 5) + (5 *5*5*5* 5);
let bo:boolean=(num1 > num2);
let re2:boolean= bo == false;
if (re2==true) {
     let a1=num1+num2-num3-num4;
  	let a2=(num1+num2-num3-num4-1);
  let re3:boolean=a1 != a2;
        if(re3==true){
        relacionales = 5;
    }
    
}else {
    console.log("R// Operacion Relacional1 incorrecta");
}
let val1 : number = 0;
let val2 : number = 0;
//let val3 : number = "Error"; //Si no reporta el error 0.5 en declaracion
let val3 : number = 0;
val1 = 7 - (5 + 10 * (20 / 5 - 2 + 4 * (5 + 2 * 3)) - 8 * (3*3)) + 50 * (6 * 2); //214
console.log(val1);
val2 = (2*2*2*2) - 9 * (8 - 6 * ((3*3) - 6 * 5 - 7 * (9 + (7 *7*7)) + 10) - 5 ) + 8 * (36 / 6 - 5 * ( 2 * 3)); //-133853
console.log(val2);
val3 = ((8*8*8) *(36*36*36) -(2*2*2*2*2) + (2*2*2) + (1) + 2) / 3; //-7962617 
console.log(" \n"+val3);

let result=(val1 - val2 + val3)*(-1);
let res2:boolean=result==(-8096684);
if( res2 == true){
  	aritmeticas++;
    aritmeticas = aritmeticas + 5;
  console.log(" \n"+aritmeticas);
}
console.log('Relacionales: ' + relacionales+ ' \nArimeticas: ' + aritmeticas+ '\nLogicas: ' + logicas);

console.log('SENTENCIAS ESCAPE\n\t\"TAB\"\rSALTO DE LINEA \n ');
console.log("TABLERO BINARIO CON TABULACIONES\n ");
console.log("0 \t1 \t0 \t1 \t0 \t1 \t0 \t1 \t0 \t1 \t0 \n "+ "1 \t0 \t1 \t0 \t1 \t0 \t1 \t0 \t1 \t0 \t1 \n "+ "0 \t1 \t0 \t1 \t0 \t1 \t0 \t1 \t0 \t1 \t0 ");