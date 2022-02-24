"use strict";

const formContent = document.querySelector('#form-template').innerHTML;

const formTemplate = Handlebars.compile(formContent);

// console.log(typeof formTemplate); 

const formDynamicValues = {
  formTitle: 'Handlebars Form',
  formId: 1,
}

const formHTML = formTemplate(formDynamicValues);

document.querySelector('#all-forms-container').innerHTML += formHTML;
