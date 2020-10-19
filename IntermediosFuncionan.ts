let array[] = [32, 21, 7, 89, 56, 909, 109, 2];
let indice = "indice ["+array[][0]+"]";// no tengo la cadena que permite ejecutar algo dentro de ella
console.log("***********************************************************************");
console.log("***********                TERNARIO                    ****************");
console.log("***********************************************************************");
console.log(indice == ("indice [32]") ? 'TERNARIO BIEN' : 'TERNARIO MALO'); // le tengo que agregar un parentesis a la condicion del ternario
console.log('\n');
console.log("***********************************************************************");
console.log("***********                 IF                         ****************");
console.log("***********************************************************************");
if (array[][4] > 50) {
    console.log("IF CORRECTO");
} else if (array[][4] == 56) {
    console.log("IF INCORRECTO");
} else {
    console.log("IF INCORRECTO");
}
console.log('\n');
console.log("***********************************************************************");
console.log("***********                 SWITCH                     ****************");
console.log("***********************************************************************");
// lo que va dentro de la expresion del switch hubo necesidad de cambiarlo porque sino no lo reconocia, solo se separó en variables
let aaa=array.length;
aaa=aaa-1;
let bbbb=array[aaa];
switch (bbbb) {
    case "1":
        console.log("SWITCH MALO");
    case "2":
        console.log("SWITCH BIEN");
    case "3":
        console.log("SWITCH BIEN");
    default:
        console.log("SWITCH BIEN");
}
console.log('\n');
console.log("***********************************************************************");
console.log("***********                 WHILE                      ****************");
console.log("***********************************************************************");
let index = 0;
while (index >= 0) {
    if (index == 0) {
        index = index + 100;
    } else if (index > 50) {
        index = index / 2 - 25;
    } else {
        index = (index / 2) - 1;
    }

    console.log(index);
}
console.log('\n');
console.log("***********************************************************************");
console.log("***********                 doWHILE                    ****************");
console.log("***********************************************************************");
index = (-1);
do {
    index = index + 1;
    if (index == 0 || index == 1 || index == 11 || index == 12) {
        console.log('*********************************************************************************************************');
    }else if (index == 2) {
        console.log('**********  ***************  ******                 ******                 ******              **********');
    }else if (index >= 3 && index <= 5) {
        console.log('**********  ***************  ******  *********************  *************  ******  **********************');
    }else if (index == 6) {
        console.log('**********  ***************  ******                 ******                 ******  **********************');
    } else if (index >= 7 && index <= 9) {
        console.log('**********  ***************  ********************   ******  *************  ******  **********************');
    } else if (index == 10) {
        console.log('**********                   ******                 ******  *************  ******              **********');
    }
} while (index != 12);

console.log('\n');
console.log("***********************************************************************");
console.log("***********                 FOR LOOP                   ****************");
console.log("***********************************************************************");
for (let i = 0; i < 10; i++) {
    let output = '';
    for (let j = 0; j < 10 - i; j++) {
        output = output + ' ';
    }
    for (let k = 0; k <= i; k++) {
        output = output + '* ';
    }
    console.log(output);
}

console.log('\n');
console.log("***********************************************************************");
console.log("***********                 FOR OF                     ****************");
console.log("***********************************************************************");
let arr[] = [1,2,3,4,5,6];
let arr2[] =[1,2,3,4,5,6]; // se saco el arreglo que estaba a la derecha de in porque no valide eso entonces puse un arreglo con lo mismo afuera
for(let i in arr2){
  let aa=arr[][i];
  // se concatenaron cadenas porque sino operaba booleanos y solo retornaba la suma de 0s y 1s
  console.log((aa == 1)+""+ (aa== 2)+""+ (aa == 3)+""+ (aa == 4)+""+ (aa == 5)+""+ (aa == 6)+""); 
  //console.log(aa);
}
console.log('\n');
console.log("***********************************************************************");
console.log("***********                 FOR IN                     ****************");
console.log("***********************************************************************");
// se saco el arreglo que estaba a la derecha de of porque no valide eso entonces puse un arreglo con lo mismo afuera
for(let e of arr2){
  let aa=arr.length;
  let mu=arr[][e];// se guarda en una variable el valor del arreglo para operarlo y se agregan cadenas para que no las sume como numeros
    if(aa > e){
      	console.log((e*mu)+" "+(e*mu)+" "+(e*mu)+" "+(e*mu)+" "+(e*mu)+" "+(e*mu));
    }
}