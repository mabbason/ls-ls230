document.addEventListener('DOMContentLoaded', (event) => {
  
  function isEmptyNode(node) {
    if (node.nodeType !== node.TEXT_NODE) return false;
      
    let allChars = node.nodeValue.split('');  
    return allChars.every(char => /\s/.test(char));
  };

  function getEmptyNodeContent(node) {
    let whitespaceChars = {
      '10': '\\n',
      '32': 'space'
    };
    let allCharCodes = node.nodeValue.split('')
                                     .map(char => char.charCodeAt(0));
    return allCharCodes.map(code => whitespaceChars[String(code)])
                       .join(', ');
  }

  function walk(node) {
    if (isEmptyNode(node)) {
      console.log(getEmptyNodeContent(node));
    } else if (node.nodeType === node.TEXT_NODE) {
      console.log(node.nodeValue);
    } else {
      console.log(node.nodeName)
    }
    for (let i = 0; i < node.childNodes.length; i += 1) {
      walk(node.childNodes[i]);
    };
  }; 

  walk(document);
});