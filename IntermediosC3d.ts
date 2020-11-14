let array[] = [32, 21, 7, 89, 56, 909, 109, 2];
let indice = array[][0];// Solo puedo hacerlo con numeros
let xd= (indice == (32)) ? 100 : 0; //ternario solo con numeros
console.log(xd); // le tengo que agregar un parentesis a la condicion del ternario
let b= array[][4];//separo el arreglo en una variable para verificar
if ( b> 50) {
    console.log("IF CORRECTO");
} else if (b == 56) {
    console.log("IF INCORRECTO");
} else {
    console.log("IF INCORRECTO");
}
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

    console.log(index+"\n");
}

console.log("***********************************************************************");
console.log("***********                 doWHILE                    ****************");
console.log("***********************************************************************");
index = (-1);
do {
    index = index + 1;
    if (index == 0 || index == 1 || index == 11 || index == 12) {
        console.log('*********************************************************************************************************');
      	console.log(" "+" \n");
    }else if (index == 2) {
        console.log('**********  ***************  ******                 ******                 ******              **********');
      console.log(" "+" \n");
    }else if (index >= 3 && index <= 5) {
        console.log('**********  ***************  ******  *********************  *************  ******  **********************');
      console.log(" "+" \n");
    }else if (index == 6) {
        console.log('**********  ***************  ******                 ******                 ******  **********************');
      console.log(" "+" \n");
    } else if (index >= 7 && index <= 9) {
        console.log('**********  ***************  ********************   ******  *************  ******  **********************');
      console.log(" "+" \n");
    } else if (index == 10) {
        console.log('**********                   ******                 ******  *************  ******              **********');
      console.log(" "+" \n");
    }
} while (index != 12);
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
console.log("***********************************************************************\n ");
let arr[] = [1,2,3,4,5,6];
let arr2[] =[1,2,3,4,5,6]; // se saco el arreglo que estaba a la derecha de in porque no valide eso entonces puse un arreglo con lo mismo afuera
for(let i in arr2){
  let aa=arr[][i];
  // se concatenaron cadenas porque sino operaba booleanos y solo retornaba la suma de 0s y 1s
  console.log((aa == 1)+" "+ (aa== 2)+" "+ (aa == 3)+" "+ (aa == 4)+" "+ (aa == 5)+" "+ (aa == 6)+" "); 
  //console.log(aa);
}
console.log('\n');
console.log("***********************************************************************");
console.log("***********                 FOR IN                     ****************");
console.log("***********************************************************************\n ");
// se saco el arreglo que estaba a la derecha de of porque no valide eso entonces puse un arreglo con lo mismo afuera
for(let e of arr2){
  let aa=arr.length;
  let mu=arr[][e];// se guarda en una variable el valor del arreglo para operarlo y se agregan cadenas para que no las sume como numeros
    if(aa > e){
      	console.log((e*mu)+" "+(e*mu)+" "+(e*mu)+" "+(e*mu)+" "+(e*mu)+" "+(e*mu));
    }
}
console.log('\n');
console.log("***********************************************************************");
console.log("***********                 SWITCH                     ****************");
console.log("***********************************************************************\n ");
let ccccc=2;
switch (ccccc) {
    case 1:
        console.log("SWITCH MALO");
    case 2:
        console.log("SWITCH BIEN");
    case 3:
        console.log("SWITCH BIEN");
    default:
        console.log("SWITCH BIEN");
}
let aaaaaa="2";
switch (aaaaaa) {
    case "1":
        console.log("SWITCH MALO");
    case "2":
        console.log("SWITCH BIEN");
    case "3":
        console.log("SWITCH BIEN");
    default:
        console.log("SWITCH BIEN");
}