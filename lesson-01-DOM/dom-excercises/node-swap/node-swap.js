"use strict";
/*
i: two id arguments
o: return true for valid swaps
   return undefined for invalid swaps

rules:
- big idea: swap the places of elements with the given ids
  - if one of the ids elements doesn't exist, return undefined
  - if one of the elements is a child of the other, return undefined
  - otherwise
    - swap places with the two given nodes


algorithm
- write function nodeSwap, takes two ids
  - declare node1 and node2 and init to respective nodes using input ids
  - guard clause
    - if !node1 or !node2
    - or if oneIsChildOfOther(node1, node2) (helper function)
    return undefined
  - deep copy each node
  - then replace each original node with the opposite copy


helper: oneIsChildOfOther takes two nodes as args
  return node1 contains node2 || node2 returns node1

*/

document.addEventListener('DOMContentLoaded', event => {
  console.log(event.type)
  console.log(event.target)
  console.log(event.target)


  function nodeSwap(id1, id2) {
    let node1 = document.getElementById(id1);
    let node2 = document.getElementById(id2);

    if ((!node1 || !node2) || 
      oneIsChildOfOther(node1, node2)) return undefined;
    
    let node1Copy = node1.cloneNode(true);
    let node2Copy = node2.cloneNode(true);

    node1.parentNode.replaceChild(node2Copy, node1);
    node2.parentNode.replaceChild(node1Copy, node2);
  };

  function oneIsChildOfOther(node1, node2) {
    return node1.contains(node2) || node2.contains(node1);
  };
});