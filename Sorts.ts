bubbleSort();
function bubbleSort(){
  let array[] = [32,21,7,89,56,909,109, 2];
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < (array.length - 1); j++){
            if(array[][j] > array[][j + 1]){
              const temp = array[][i];
    		  array[i] = array[][j];
              array[j] = temp;
            }
        }
    }
    console.log('BubbleSort: '+ array);
}