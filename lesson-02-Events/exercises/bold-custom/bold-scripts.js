"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let sectionElement = document.querySelector('section');

  makeBold(sectionElement, function(elem) {
    elem.classList.add('highlight');
  });

  function makeBold(elem, callback) {
    elem.style.fontWeight = "bold";
    callback(elem);
  };
});