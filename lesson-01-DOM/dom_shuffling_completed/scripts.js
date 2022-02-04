document.addEventListener('DOMContentLoaded', () => {
  let header = document.querySelectorAll('header')[1];
  let mySiteH1 = document.querySelector('main h1');
  let article = document.querySelector('article');
  // console.log(article);
  
  header.insertAdjacentElement('afterbegin', mySiteH1);
  document.body.insertAdjacentElement('afterbegin', header);
  
  let [babyPic, chinStickPic] = document.querySelectorAll('img');
  let [chinStickFig, babyFig] = document.querySelectorAll('figure');
  
  chinStickFig.insertAdjacentElement('afterbegin', chinStickPic);
  babyFig.insertAdjacentElement('afterbegin', babyPic);
  
  article.insertAjacentElement('beforeend', chinStickFig);
  article.insertAjacentElement('beforeend', babyFig);
});