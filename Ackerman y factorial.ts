function ackermann(m: number, n: number): number {
    //console.log("m: "+m +" n: "+n);
  	if (m == 0) {
        return (n + 1);
    } else if (m > 0) {
      if(n == 0){
       return ackermann(m - 1, 1); 
      }else {
       	 return ackermann(m - 1, ackermann(m, n - 1));
    	}
    } 
}
function factorial(n: number): number {
    if (n==0) {
            return 1;
    }else{
      return n * factorial(n - 1);
    }    
}
console.log("--------------SALIDA ACKERMAN 3,7--------------");
 console.log(factorial(10));
 console.log(ackermann(3, 7)); //509