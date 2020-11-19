let arr[]= [32,21,7,89,56,909,109,2,9,1,44,3,8200,11,8,10];
let tam=arr.length;
for(let i = 0; i < tam; i++){
  let tam2=arr.length;
  tam2=tam2-1;
        for(let j = 0; j < tam2; j++){
            let a=arr[][j];
            let b=arr[][j + 1]
            if(a > b){
                const temp:number = arr[][i];
                arr[i] = arr[][j];
                arr[j] = temp;
            }
        }
    }
console.log('bubleSort: '+ arr);
let arr2[]= [32,21,7,89,56,909,109,2,9,1,44,3,8200,11,8,10];
let tam3=arr2.length;
for(let i = 1; i < tam3; i++){
    let j:number = i;
    let temp = arr2[][i];
    let tem2=arr2[][j - 1];
    while((j > 0) && (tem2 > temp)){
        arr2[j] = arr2[][j-1];
        j--;
    }
    arr2[j] = temp;

}
console.log('insertSort: '+ arr2);