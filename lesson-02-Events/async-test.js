let data = new Promise((resolve, reject) => {
  
  let value = setTimeout(() => {
    let number = Math.random();
    if (number < 0.75) {
      resolve(number);
    } else {
      reject(number);
    }
  }, 2000);  
});

let data = new Promise ((resolve, reject) => {
    setTimeout(() => {
      let number = Math.random();
      if (number < 0.50) {
        resolve(number);
      } else {
        let error = new Error('number out of range');
        reject(error);
      }
    }, 100);  
  });


good (thing) => {
 return thing
// }

data.then(value => console.log(`In range: ${value}`))
    .catch(value => console.log(`Out of range: ${value}`));  


async function showResult() {
  try {
    let result = await data;
    console.log(`In range: ${result}`);
  } catch (error) {
    
//     console.log(rejectedValue.constructor)
    
//     console.log(`Out of range: ${rejectedValue.message}`);
    console.log(error.message);
  }
}

showResult();
console.log('SECOND line first');