function floor(num) {
    let result = Math.trunc(num);
    if(num >= 0 && num % 1 !== 0) result++; // honestly fucking stupid considering i still need mod
    // if num is a non-negative int and the remainder (num mod 1) is also a non negative integer
    return result;
  }
  
  function modulo(a, b) {
    return a - floor(a/b) * b; 
  }
  // a - the largest integer returned from a/b, culling the floating point, multiplied by b 
  function gcd(a, b) {
    if(b === 0) return a;
    // if secval is 0
    let remainder = modulo(a, b);
    // mod operation on a,b 
  
    return gcd(b, remainder);
  }
  
  function compute() {
    let num1 = parseInt(prompt("Enter first number: "));
    let num2 = parseInt(prompt("Enter second number: "));
    // tonumbered string values for js calculation, culled with math.abs
    let result = gcd(num1, num2);
    
    console.log(`GCD of ${num1} and ${num2} is ${result}`);
  }
  
  compute();
