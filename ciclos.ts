console.log("------------- Ciclos -------------------");
    let iter: number = 0;
    let str2: string = "DO WHILE\n ";
    do {
        iter++;
      let rel1:boolean=iter > 0;
      let rel2:boolean=iter <= 5;
      let rel3:boolean=rel1&&rel2;
        if ( rel3==true ) {
            console.log("\t CINCO VECES ESTO\n ");
        }
            let rel4:boolean=iter > 5;
            let rel5:boolean=iter <= 10;
            let rel6:boolean=rel1&&rel2;
        if (rel6==true) {
            if (iter == 6) {
                console.log( " \t");
            }
            console.log(iter + " ");
            if (iter == 10) {
                console.log( " \n");
            }
        }
            let rel7:boolean=iter > 10;
            let rel8:boolean=iter <= 15;
            let rel9:boolean=rel1&&rel2;
        if (rel9==true) {
            if (iter == 11) {
                console.log( " \t");

            }
          	console.log( (iter + 1) +" \t");
        }
    } while (iter < 15);

    console.log('------------ WHILE ANIDADO --------------- \n ');
    iter = 0;
    let iter2: number = 0;
    while (iter < 5) {
        iter2 = 0;
        console.log("TABLA DEL " + iter+" \n ");
        while (iter2 < 5) {
            console.log(iter + " x " + iter2 + " = " + (iter * iter2) + "\n ");
            iter2++;
        }
        iter++;
    }
    console.log('------------ FOR ANIDADO --------------- \n ');
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

let ifs : number = 0;
    if (10 - 15 >= 0 && 44.44 == 44.44) {
        ifs--;
    }
    else if(false || false){
        ifs--;
    }
    else {
        if (15 + 8 == 22 - 10 + 5 * 3 - 4 && 13 * 0 > -1) {
            if (10.0 != 11.0 - 1.01) {
                ifs = 100;
            }
            else {
            }
        }
        else {
        }
    }
    console.log('If: '+ ifs);
    switch (4) {
        case 0:
            console.log('Switch 1 malo');
        default:
            console.log('Switch 1 bueno');
    }
/*let val1=0;
val1 = ((-1) == 0) ? 10 : ((-1) == 1) ? 20 : ((-1) == 2) ? 30 : 40;
console.log(val1+" ");
console.log((val1 == 40) ? "Correcto Ternario 1" : "Incorrecto Ternario1");
console.log((val1 != 40) ? "Incorrecto Ternario2" : (val1 == 40) ? "Correcto Ternario 2" : "Incorrecto Ternario 2");*/
