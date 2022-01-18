"use strict";
let countLogger;
function startCounting() {
  let num = 0;
  countLogger = () => {
    setInterval(() => {
      console.log(num);
      num += 1;
    }, 1000);
  }
  countLogger();
};

function stopCounting() {
  clearInterval(countLogger);
}

startCounting();

setTimeout(() => {
  stopCounting(countLogger);
}, 5000);