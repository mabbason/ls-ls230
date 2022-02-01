2. In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.

```javascript
setTimeout(() => {      // 1
  console.log('Once');  // 5
}, 1000);

setTimeout(() => {      // 2
  console.log('upon');  // 7
}, 3000);

setTimeout(() => {      // 3
  console.log('a');     // 6
}, 2000);

setTimeout(() => {      // 4
  console.log('time');  // 8
}, 4000);
```

3. In what sequence does the JavaScript runtime run the functions q, d, n, z, s, f, and g in the following code?

```javascript
setTimeout(() => {    
  setTimeout(() => {   
    q();               // 7
  }, 15);

  d();                 // 3

  setTimeout(() => {
    n();               // 5
  }, 5);

  z();                 // 4
}, 10);

setTimeout(() => {      
  s();                 // 6
}, 20);

setTimeout(() => {     
  f();                 // 2
});

g();                   // 1
```

4. Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. 
The function should wait for the indicated period, then invoke the callback function.

```javascript
function afterNSeconds(callback, secs) {
  setTimeout(callback, 1000 * secs);
};
```