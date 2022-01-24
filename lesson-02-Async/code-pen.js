document.addEventListener("DOMContentLoaded", event => {
  let divs = document.querySelectorAll('.pick');

  for(let index = 0; index < divs.length; index += 1) {
    divs[index].addEventListener('click', highlightThis, true);
  }
      
  function highlightThis(e) {
    alert(`${this.className} ${e.currentTarget.tagName}`);
  }
});