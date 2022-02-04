"use strict";

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(callbacks) {
  let allCBs = Array.from(arguments);
  let timeLimit = 2 * allCBs.length;
  let currTime = 0;

  let timer = setInterval(() => {
    currTime += 1;
    console.log(currTime);
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
  }, timeLimit * 1000);

  const getRandomTime = (max) => {
    return Math.floor(Math.random() * max * 1000);
  }

  allCBs.forEach(cb => {
    setTimeout(cb, getRandomTime(timeLimit));
  });
}

randomizer(callback1, callback2, callback3);