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
  - get the parent and position of each node
  - remove each node from their positions
    - move into temporary holder???
  - insert each node at their new positions
  - remove temporary holder structure??


helper: oneIsChildOfOther takes two nodes as args
  return !hasChild(node1, node2) && !hasChild(node2, node1);

helper: hasChild takes two nodes as args, parent, child
  declare currentNode and init to childNode
  loop until currentNode === body
    - if currentNode.parent === parent
      - return true
    - reassign currentNode to currentNode.parent
  return false

*/