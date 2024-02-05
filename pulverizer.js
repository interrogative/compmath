function pulverize(num) {
    let result = '';
 // let nigga = tonumber(result)
    
    while(num > 0) { // assume a nonnegative integer is present
      let digit = num % 10;
      // value mod 10 to return the remainder element
      result += digit;
      
      num = Math.floor(num / 10); 
      // return largest non-negative integer with culled decimals under the division of 10 (a dec)
    }
    
    return parseInt(result);
  }
  
  function check() {
    let num = parseInt(prompt("Enter a number: "));
    let pulverized = pulverize(num);
    
    if(num === pulverized) {
      console.log("unchanged after pulverization");
    } else {
      console.log("number changed after pulverization");
      console.log("original: ", num);
      console.log("pulverized: ", pulverized);
    }
  }
  
  check();
