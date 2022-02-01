"use strict";
/*
I: start element id, end element id
O: array with string tagNames of the tree slice, or undefined

rules:
- if either input id does not have a corresponding element with the same id, return undefined
- if tracing from the end back to the start does NOT result in a viable path, return undefined

examples
given (start, end) --> (11, 19)
both el w id 11 and el w id 19 exist
start with 19
  - get the tagName of 19
  - get the parent of 19 (parent = 18)
    - get the tagName 18
    - get the parent of 18 (parent = 17)
      - get the tagName 17
      - get the parent of 17 (parent = 16)
        - get the tagName 16
        - get the parent of 16 (parent = 11)
          - get the tagName 11
         * 11 is the start so we can stop tracing 

Data structure: array

Algorithm:
- write function sliceTree, takes two integer ids
  - convert inputs to strings
  - guard clause test if both ids exist
  - declare array to hold the tree slice init to empty array
  - declare currID and init to endId input
    - while currID !== start ID or '1'
      - get the tagName of currID
      - push the tagName to the treeSlice array
      - if currID === start ID, return treeSlice array
      - reassign currID to id of parent element
  - return undefined 
*/

document.addEventListener('DOMContentLoaded', event => {
  function sliceTree(stID, endID) {
    [ stID, endID ] = [ String(stID), String(endID) ];

    if (!document.getElementById(stID) 
     || !document.getElementById(endID)) return undefined;

    let treeSlice = [];
    let currID = endID;

    do {
      let currElement = document.getElementById(currID);
      treeSlice.unshift(currElement.tagName);
      if (currID === stID) return treeSlice;
      currID = currElement.parentNode.getAttribute('id');
    } while (currID)

    return undefined
  }

  console.log(sliceTree(1, 4));
  console.log(sliceTree(1, 76));
  console.log(sliceTree(2, 5));
  console.log(sliceTree(5, 4));
  console.log(sliceTree(1, 23));
  console.log(sliceTree(1, 22));
  console.log(sliceTree(11, 19));
});