console.log("--------------------");
console.log("       GLOBAL       ");
console.log("-------------------- \n ");
let numbernumber:number = 5 + 2*2 + (5*5*5*5*5) + 10*10 + 1000/25 - 15*15;
let numberstring:string = 100 + "Usac";
let stringnumber:string = "Usac" + 2500;
let stringstring:string = "Universidad" + " San Carlos";
let stringboolean:string = "Sistemas" + true;
let stringboolean2:string = "Industrial" + false;
let booleanstring:string = true + "Sistemas";
let booleanstring2:string = false + "Industrial";

console.log(numbernumber+" \n");
console.log(numberstring);
console.log(stringnumber);
console.log(stringstring);
console.log(stringboolean);
console.log(stringboolean2);
console.log(booleanstring);
console.log(booleanstring2);

if(true){
    const n1:number = 5*5*5;
      const n2:number = (n1+(4*4*4))*(n1+(4*4*4))*(n1+(4*4*4));
      let n3:number = ((((1+1+1+1+1-5-10)*(-1))+(4*3-n1))+8200*3/10)*3;
      let n4:number = n3/8/10;
      console.log(n2+" "+n4+" \n ");
  
      const str1:string = 'ComPi 2';
  
      console.log('FUNCIONES STRING:\n ');
      console.log('Concatenacion:\n ');
      let str22=str1.concat(' C3D - segundo Proyecto')
        console.log(str22+" \n");
    
      console.log('ToUpperCase:\n ');
        let str221=str1.toUpperCase();
      console.log(str221+" \n");
      console.log('ToLowerCase:\n ');
        let str23=str1 + ' SI SALE';
        let str222=str23.toLowerCase();
      console.log(str222);
      console.log('length:\n ');
      console.log(str1.length+" \n");
  
      console.log('Concatenacion + :\n ');
      console.log('string + string\n ');
      console.log(str1 + ' C3D - segundo Proyecto\n ');
      console.log('string + numero entero\n ');
      console.log('entero = ' + n2+" \n ");
      console.log('string + numero decimal\n ');
      console.log('decimal = ' + n4+"\n ");    
  }

  
if(true){
    if(true){
        console.log("--------------------");
        console.log("       LOCAL         ");
        console.log("--------------------\n ");
        let numbernumber:number = 5 + 2*2 + (5*5*5*5*5) + 10*10 + 1000/25 - 15*15;
        let numberstring:string = 100 + "Usac";
        let stringnumber:string = "Usac" + 2500;
        let stringstring:string = "Universidad" + " San Carlos";
        let stringboolean:string = "Sistemas" + true;
        let stringboolean2:string = "Industrial" + false;
        let booleanstring:string = true + "Sistemas";
        let booleanstring2:string = false + "Industrial";

        console.log(numbernumber+"\n ");
        console.log(numberstring);
        console.log(stringnumber);
        console.log(stringstring);
        console.log(stringboolean);
        console.log(stringboolean2);
        console.log(booleanstring);
        console.log(booleanstring2);
    }
}