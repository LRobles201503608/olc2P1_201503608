let val1 = 0;
let val2 = 0;
let val3 = 0;
let a = 0;
let b = 0;
val1 = 7 - (5 + 10 * (20 / 5 - 2 + 4 * (5 + 2 * 3)) - 8 * 3 ** 2) + 50 * (6 * 2); //214
val2 = 2 ** 4 - 9 * (8 - 6 * (3 ** 2 - 6 * 5 - 7 * (9 + 7 ** 3) + 10) - 5 ) + 8 * (36 / 6 - 5 * ( 2 * 3)); //-133853
val3 = (8 ** 3 * 36 ** 0.5 - 2 ** 5 + 2 ** 3 + 16 ** 0.5 + 2) / 3; //-1018 
let val4 = val1+val2+val3+val4; //Error, comentar despues de reportar
if(val1 - val2 + val3 == 135085){
    console.log('Aritmeticas 100');
}
let String_3: string;
let String_4: string;
let int2_:number;
let TRUE :boolean = true;
let FALSE :boolean = false;
int2_ = 45;
int2_ --; 
//en el siguiente agregue unos parentesis de más para que pudiera hacer bien las operaciones logicas, en el caso del -1 es para que lo reconozca
String_3 = (((int2_ > 77) || FALSE))+ ","+ ((int2_ < 78) && TRUE) + "," + ((int2_ + 10) <= int2_ || FALSE)+ ","+ (!!!!!!!!!!!! (int2_ + 10 >= int2_));
String_4 = (int2_ >= 77 || (-1) < 100)+ ","+ (int2_ > 78 && 100 + 0);

console.log("Lógica 1" + " = " + String_3); //false,true,false,true
console.log("Lógica 2" + " = " + String_4); //true,false);

//aqui tuve que separar cada condicion que hacia en pequeñas condiciones para poder evaluar la cadena de entrada normal
// esto debido a que cuando lo hacia juntas en algun momento retornaba mal un valor pero al hacerlo junto funcionaba bien
let b1:boolean=(a == 0);
let b2:boolean= (44.3 < 44.4);
let b3:number= (2**5);
let b4:number= (31 + 2 % 1);
let rel1:boolean=(b1!=b2);
let rel2:boolean=(b3==b4);
let relacionaes : boolean = (rel1 == rel2);
let bb:boolean=((b == a));
let bb1:boolean=(relacionaes==bb);
let bb2:boolean=(532 > 532);
let bb3:boolean=(String_3 == "false,true,false,true");
let bb4:boolean=(String_4 == "true,false");
let bb5:boolean=(bb2 == bb3);
let bb6:boolean=(bb4 == bb5);
relacionaes = bb1!=bb6;
    if(relacionaes){
        console.log("Relacionels 100");
    }
    else{
        console.log("Relacionales 0");
    }

const dimension = 3;
const dim2; //este dim no me reporta error porque el error me lo reporta igual que en typescript, cuando ya tratas de asignarle algun valor

//al arreglo le tuve que quitar el tipo y solo dejarlo como un let cualquiera, esto porque ya no me dio tiempo de validar el tipo
let arreglo[] = ["Estudiante1", "Estudiante2", "Estudiante3"];
//Posicion 0 - 2 para estudiante 1
    //Posicion 3 - 5 para estudiante 2
    //Posicion 6 - 8 para estudiante 3
 let tablero [] = [0,0,0,0,0,0,0,0,0];
 let estado [] = [false, false, false, false, false, false, false, false, false];
function agregar(i : number, j : number, nota : number) : boolean{
        if(!estado[][i * dimension + j]){// en esta parte para usar una variable de arreglo como expresion se le tiene que agregar ese corchete extra
            //explicarle que no entendés por que si incluso es el mismo no terminal de cuando lo usas para asignar algo
            tablero[i * dimension + j] = nota; 
            estado[i*dimension + j] = true;
            return true;
        }
        console.log("Posicion ocupada");
        return false;
    }
function imprimirPromedio(estudiante : number){
        let promedio1 = (tablero[][estudiante * dimension + 0]); //aqui igual, como es una expresion le tengo que agregar esos corchetes de más
  		let promedio2 = (tablero[][estudiante * dimension + 1]);
  		let promedio3 = (tablero[][estudiante * dimension + 2]);
  		let promedio = ((promedio1+promedio2+promedio3)/3);
        console.log("Promedio Estudiante "+ arreglo[][estudiante]+ " = "+ promedio); // la concatenacion en el console.log solo la logre con +
    }
//Error porque es una constante
    //Si no reporta el error -0.5 en asignacion de variables
    dimension = 30;

    //Notas estudiante 1
    agregar(0,0, 90);
    agregar(0,1, 95);
    agregar(0,2, 92);

    //Notas estudiante 2
    agregar(1,0, 85);
    agregar(1,1, 90);
    agregar(1,2, 100);

    //Notas estudiante 3
    agregar(2,0, 20);
    agregar(2,1, 100);
    agregar(2,2, 100);

    //Imprimir Promedios
    imprimirPromedio(0); //92.33 -> + 0.5
    imprimirPromedio(1); //91.66 -> + 0.5
    imprimirPromedio(2); //70 -> + 0.5

    //Debe imprimir posicion ocupada -> + 0.5
    agregar(2,0, (-1));

/*
Aritmeticas 100
Lógica 1 = false,true,false,true
Lógica 2 = true,false
Relacionels 100
Promedio Estudiante  Estudiante1  =  92.33333333333333
Promedio Estudiante  Estudiante2  =  91.66666666666667
Promedio Estudiante  Estudiante3  =  73.33333333333333
Posicion ocupada
*/