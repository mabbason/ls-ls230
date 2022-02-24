"use strict";
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});


class View {
  constructor() {
    this.homeElement = document.querySelector('.homePage');
    this.formElement= document.querySelector('section.contactForm');
    this.addElement = document.querySelector('.addContact');
    this.editElement = document.querySelector('.editContact');
    this.mainViewElements = [ this.homeElement, this.formElement, this.addElement, this.editElement ];
  
    this.listContacts = document.querySelector('.listContacts');
    this.contactForm = document.querySelector('.contactForm');

    this.#initLocalListeners();
    // this.listTodosContainer = document.querySelector('#list-todos-container');
    // this.renderAddTodoForm();
  }

  #toggleHiddenToActive(element) {
    this.mainViewElements.forEach(element => element.classList.add('hidden'));
    element.classList.remove('hidden');
    if (element === this.addElement || element === this.editElement) {
      this.formElement.classList.remove('hidden');
    }
  }

  #initLocalListeners() {
    document.querySelector('body').addEventListener('click', event => {
      if (event.target.tagName === 'H1' || event.target.tagName === 'H2' ) {
        this.#toggleHiddenToActive(this.homeElement);
      }
      else if (event.target === document.querySelector('.addContactBtn')) {
        this.#toggleHiddenToActive(this.addElement);
      }
    });
  }

  #formatTags(formInput) {
    let tagMatches = formInput.match(/[a-z-][^a-z]*[a-z-]*/gi);
    return tagMatches.map(tag => tag.toLowerCase()).join();
  }

  #formInputsToObj(rawInputs) {
    let contact = {};
    for (let i = 0; i < rawInputs.length - 2; i += 1) {
      let input = rawInputs[i];
      contact[input.name] = input.name === 'tags' ? 
        this.#formatTags(input.value) : input.value;
    }
    return contact;
  }

  bindAddContact(handler) {
    let form = this.formElement.querySelector('.addContact form');

    form.addEventListener('submit', event => {
      event.preventDefault()

      let contact = this.#formInputsToObj(form.elements);
      handler(contact);
      // form.reset();
    })
  }

  bindDeleteContact(handler) {
   //event listener ON contacts container for delete button
  }

  bindDeleteContact(handler) {
    //event listener ON contacts container for edit button
   }
};

export default View;