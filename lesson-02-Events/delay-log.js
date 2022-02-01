"use strict";

function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(() => {
      console.log(i);
    }, (1000 * i));
  }
};

delayLog();