"use strict";

document.addEventListener('DOMContentLoaded', event => {
  let answer = Math.floor(Math.random() * 100) + 1;
  let form = document.querySelector('form');
  let input = document.getElementById('guess');
  let submitButton = document.querySelector('input[type="submit"]');
  let newGameLink = document.querySelector('A');
  let outputMsg = document.querySelector('p');

  outputMsg.textContent = 'Guess a number from 1 to 100';

  function isValidInput(input) {
    return Number.isInteger(input);
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    let guess = parseInt(input.value, 10);
    let message;
    
    if (!isValidInput(guess)) {
      message = `Please enter a number.`;
      input.value = null;
    } else if (guess > answer) {
      message = `The answer is lower than ${guess}.`;
      input.value = null;
    } else if (guess < answer) {
      message = `The answer is higher than ${guess}.`;
      input.value = null;
    } else if (guess === answer) {
      message = 'You guessed the correct number!'
      submitButton.disabled = true;
    }

    outputMsg.textContent = message;
  });

  newGameLink.addEventListener('click', event => {
    event.preventDefault();
    answer = Math.floor(Math.random() * 100) + 1;
    outputMsg.textContent = 'Guess a number from 1 to 100';
    input.value = null;
    submitButton.disabled = false;
  });
});
