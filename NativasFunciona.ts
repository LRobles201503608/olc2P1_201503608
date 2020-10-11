/************ STACK *****************/
let stack [] = [0];
const MAXSIZE = 50;
const MINZIE = 0;

function apilar(num : number) : void{
  let tam:number=stack.length;
    if(tam == MAXSIZE){
        console.log("Pila llena");
    }
    else{
        stack.Push(num);
    }
}

function desapilar() : void{
  let tam:number=stack.length;
    if(tam == MINZIE){
        console.log("Pila vacia");
        return;
    }
    else{
        stack.Pop();
    }
}

function estadoPila() : boolean{
  let tam:number=stack.length;
    return (tam == MAXSIZE);
}

function vaciar() : void{
    stack = [""];
}
for(let i = 1; i < (20 && !estadoPila()); i++){
    apilar(i);
}
console.log(stack.length); //20
console.log(stack);

for(let i = 0; i < 10; i++){
    desapilar();
}
console.log(stack.length); //10
console.log(stack);

for(let i = 10; i < 55; i++){
    apilar(i);
}

console.log(stack.length); //50
console.log(stack);
let temp = '';
for(let i of stack){
    temp =  temp + '|' + i + '|' +stack[][i]+ '|\n';
}
console.log("Pos | Val \n"+temp);


/***************** GRAFICAR TS*******************/
let x : number = 10;
let y : string = "Hola compi2";
let z : boolean = true;
let arreglo [] = [1,2,3,4,5];
let arreglo2 [] = [true, false];

function funcion1() : void{
    graficar_ts; //Grafica global
}

function funcion2(param1 : number, param2 : string, param3 : boolean) {
    graficar_ts; //Grafica global + 3 parametros
}

function funcion3(){
    let x = 10;
    let y = 10;
    let z = 20;
    graficar_ts;//Grafica global + 3 variables
}

graficar_ts; //Grafica sin hola

let hola = 20;
graficar_ts; //Grafica con hola
funcion1();
funcion2(1, "2", true);
funcion3();