/*
input: single int, the element id, min is number 1
output: array, of nested arrays

rules: assume the int given has valid html element
  - always return an array w at least 1 nested array
  - always going to contain the top level element at id 1 --> ["ARTICLE"]
  - the nested array at index 0 will be the element referenced by passed in int
    - the nested array at index 1 will be the parent and any siblings of passed in int
      - the next nested array will be the parent of all the children and any parent siblings, etc...
      - continued walking the tree until the element with id === 1 is reached
    
E
domTreeTracer(22)
- look for element id 22
- any siblings??? --> no
  [[22]]
  - if the element w id of 1 is NOT in the yet, then...
  - look for the parent of 22, which is 21, goes into new array
    - any siblings??? --> no
    [[22], [21]]
      - if the element w id of 1 is NOT in the yet, then...
      - look for the parent of 21, which is 20, goes into new array
      - any siblings??? --> yes, it's 17, put the sibling in the same array as 20
      [[22], [21], [20, 17]]
        - etc...

Data Structure
  arrays

Algorithm
  - write function domTreeTracer, takes single int as argument
    - declare empty array to hold all child arrays
    - while the holding array does NOT contain div w id === 1
      - get an array of the children of the parent of the element with id === input
        - helper function???
      - push to holding array
      - change child id to one of the parent elements
    - iterate over the holding array, converting each element to just the name
      - string, all caps
    - return holding array

*/

function domTreeTracer(id) {
  let allElements = [];
  let currID = id;
  
  while (allElements.filter(sub => sub.includes('ARTICLE')).length === 0) {

    let parent = document.getElementById(String(currID)).parentNode;
    let allChildren = Array.from(parent.children).filter(el => el.id);
    currID = parent.id;
    
    allChildren = allChildren.map(el => el.nodeName);
    allElements.push(allChildren);   
  }
  
  return allElements;
};




/*
> domTreeTracer(1);
= [["ARTICLE"]]

> domTreeTracer(2);
= [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]

> domTreeTracer(22);
= [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
*/

// console.log(domTreeTracer(1));
console.log(domTreeTracer(22));
// console.log(domTreeTracer(22));