"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let txtField = document.querySelector('.text-field');
  let text = document.querySelector('.content');
  let cursorBlink;
  
  document.addEventListener('keydown', event => {
    let keyPress = event.key;
    if (txtField.classList.contains('focused')) {
      if (keyPress === 'Backspace') {
        let currText = text.textContent;
        text.textContent = currText.slice(0, currText.length - 1);
      } else {
        text.textContent += keyPress;
      }
    }
  });

  txtField.addEventListener('click', event => {
    event.stopPropagation();
    if (!txtField.classList.contains('focused')) {
      cursorBlink = setInterval(() => {
        txtField.classList.toggle('cursor');
      }, 500);
    }
    txtField.classList.add('focused');
  });

  document.addEventListener('click', event => {
    txtField.classList.remove('focused', 'cursor');
    clearInterval(cursorBlink);
  });

});