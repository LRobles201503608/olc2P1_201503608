function getPivot(value : number) : number{
    return ((value % 1) == 0) ? value : value - 0.5; // se agregan parentesis a la condicion
}

function swap(i : number, j: number, array) : void{
    const temp = array[][i]; // se tiene que agregar el corchete extra
    array[i] = array[][j];
    array[j] = temp;
}

function quickSort(low: number, high: number, array) : void{ // aca el array no hay que definirle tipo porque sino no lo reconoce como arreglo, ya no me dio tiempo de validar eso
    let i = low;
    let j = high;
    let pivot = array[][getPivot((low + high) / 2)];

    while(i <= j){
        while(array[][i] < pivot){
            i++;
        }

        while(array[][j] > pivot){
            j--;
        }
        if(i <= j){
            swap(i, j, array);
            i++;
            j--;
        }
    }

    if(low < j){
        quickSort(low, j, array);
    }
    if(i < high){
        quickSort(i, high, array);
    }
}

let array [] = [8, 48, 69, 12, 25, 98, 71, 33, 129, 5]; //solo se le quita el tipo
// se separan en variables el .lenght -1 porque sino no se porque no lo agarra
let aaaa= array.length;
aaaa=aaaa-1;
quickSort(0, aaaa, array);
console.log('QuickSort: '+ array);