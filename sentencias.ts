let x [] = [0, 1, 4, 5, 6, 7, 8, 9];
    let y [] = [0,0,0,0,0,0,0,0,0,0];
    console.log("-------Operaciones con length-------\n ");
    console.log(x.length);//8
    console.log(" \n");
	console.log(y.length);//10
    console.log(" \n");
	console.log(x.length + y.length);
	console.log(" \n");
    console.log(x.length - y.length);
	console.log(" \n");
    console.log(x.length * y.length);
	console.log(" \n");
    console.log(x.length / y.length);
	console.log(" \n");
	console.log(x.length % y.length);
	console.log(" \n");
	console.log("INICIA FOR IN \n");
    for (let i in x) {
        console.log(i+" ");
    } 
     /********************************************************************/
     let x2[] = [0, 1, 4, 5, 6];
     console.log(" FOR IN UNA DIMENSION NUMEROS \n ");
    for (let i in x2) {
        console.log(i+" ");
    }
    console.log(" FOR OF UNA DIMENSION NUMEROS \n ");
    for (let i of x2) {
        console.log(i+" ");
    }