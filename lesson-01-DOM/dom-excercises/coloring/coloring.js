"use strict";

/*
i: single integer
o: adding the '.generation-color' class to the correct generation

algorithm
- write function colorGeneration, takes single int as arg
  - walk the entire DOM tree
    - if a node is an element
      get node generationNum (helper function)
      - if node genNum === input num
        - add the class

helper: getGenerationNum, takes single element as arg
  declare genNum and init to 0
  declare currElement and init to input element
  while currElement.tagName is NOT 'BODY'
    - increment genNum
    - reassign currElement to parent of currElement
  return genNum
*/


document.addEventListener('DOMContentLoaded', event => {
  function walk(node, callback) {
    callback(node);
    for (let i = 0; i < node.childNodes.length; i += 1) {
      walk(node.childNodes[i], callback)
    }
  };

  function colorGeneration(genNum) {
    if (genNum > 0) {
      walk(document.body, node => {
        if (node instanceof Element && getElementGenNum(node) === genNum) {
          node.classList.add('generation-color');
        }
      });
    }
  };

  function getElementGenNum(element) {
    let genNum = 0;
    let currElement = element;
    while (currElement.tagName !== 'BODY') {
      genNum += 1;
      currElement = currElement.parentNode;
    }
    return genNum;
  }

  colorGeneration(3);
});