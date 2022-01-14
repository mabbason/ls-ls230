let topH1 = document.body.querySelector('h1');
let navHeader = document.body.getElementsByTagName('header')[1];
let navBar = document.body.getElementsByTagName('nav');

navHeader.insertBefore(topH1, navHeader.firstChild)
document.body.insertBefore(navHeader, document.body.firstChild);

let [ babyImg, chinStkImg ] = [ ...document.body.getElementsByTagName('img') ];
let [ chinStkFigure, babyFigure ] = [ ...document.body.getElementsByTagName('figure') ];

chinStkFigure.insertBefore(chinStkImg, chinStkFigure.firstChild);
babyFigure.insertBefore(babyImg, babyFigure.firstChild);

let article = document.body.getElementsByTagName('article')[0];

article.appendChild(chinStkFigure);
article.appendChild(babyFigure);