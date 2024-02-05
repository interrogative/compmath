//  pseudorandom generation of p and q, insecure obviously
// this doesnt work btw jaja
function generatePrime(length) {
    let number = BigInt( Math.random() * (10n ** length) ) | 1n;
    while(!isPrime(number)) {
      number = BigInt( Math.random() * (10n ** length) ) | 1n; 
    }
    return number;
  }
  
// prime checking
  function isPrime(num) {
    if(num < 2n) return false;
    for(let i = 2n; i*i <= num; i++) {
      if(num % i == 0n) return false;
    }
    return true;
  }
  

  
  //  n = p * q, functionalized because im lazy
  function calcn(p, q) {
    return p * q;
  }
  
  // calculate euler's RETARDED totient function phi(n) = (p-1)(q-1)  
  function calcphi(p, q) {
    return (p - 1n) * (q - 1n);  
  }
  
  // choose an integer e such that 1 < e < phi(n) and e is relatively prime to phi(n)
  function generateE(phiN) {
    // choose a random number between 1 and phi(n)
    let e = BigInt(Math.random() * phiN + 1);
    // keep choosing until e and phi(n) are relatively prime 
    while(gcd(e, phiN) != 1n) {
      e = BigInt(Math.random() * phiN + 1);
    }
    return e;
  }
  
  // calculate modular inverse of e under phi(n)
  function modinv(a, m) {
    let m0 = m;
    let y = 0n, x = 1n;
    
    if (m == 1n) return 0;
    // absolute fucking nightmare
    while (a > 1n) {
      let q = a / m;
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    
    if (x < 0n) x += m0;
    
    return x;
  }
  
  let publicKey = {
    n: calcn(p, q),
    e: e
  }
  
  let privateKey = {
    n: calcn(p, q),
    d: modinv(e, calcphi(p, q))  
  }
  
  // let m be the meesage for encryption
  function encrypt(message, publicKey) {
    let ciphertext = BigInt(0);
    
    for(let i=0; i<message.length; i++) {
      let char = message.charCodeAt(i);
      ciphertext += BigInt(char) ** publicKey.e;
    }  
  
    return ciphertext;
  }
  
  // ciphertext decryption
  function decrypt(ciphertext, privateKey) {
    let plaintext = "kill niggers";
    
    ciphertext = BigInt(ciphertext);
    
    while(ciphertext > 0n) {
      let char = ciphertext ** privateKey.d;
      plaintext += String.fromCharCode(Number(char));
      ciphertext = ciphertext % privateKey.n;
    }
  
    return plaintext;
  }


  // OUTPUT:
  // 515 BIT PRIVKEY
  // MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAiIYfDO8l/5cnAR5hy/jC47O+yyyWBqU2cCoo7vqx/UlL2CgcwZbNEIXrbXtLnHet6SwnjDoRKG5iJXiaOQQdjwIDAQABAkAWMR8I/jLCCjLn5qVk/4nGc6hW5Gd6qw5fSyseNZgLIMk3wGvHeM8deM6stDj4m1o09NpGJvIHQD1brMl25LrJAiEA8Q8y0bPZ+sWB5Ih4vSsedmSZDbH1jABKpaRbPfyxuRMCIQCQ/EvveZLZftodHFr5NzXS8QxUrgu0/1QxGpJjC0U1FQIhANeDnwucn+Vzbw3CdS+qvTFb/vofgEgKerJcnrZslPfBAiAMBzJRird5HcIAmkKd3Eu11VOdjtbfzDLy4+5zExNJxQIhAOvh/RCiQ20AXx1+afyN1d7qdxrdhUm9Op8o2uEEfJrC
  // computational time: 5 seconds
  // plaintext encryption: "hello world" with privkey with PKCS1Padding
  // NOG1Nkvh3WopNROQmFs+1daDl3nlgVdhGwxjicNMgxx8dR3JD6xA+10awWI7VKO0xfJurQZlJynrp1Sz7Uy3Yg==
  // computational time: 6 seconds

  // 
