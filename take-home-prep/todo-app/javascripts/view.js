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


class View {
  constructor() {
    this.addTodoContainer = document.querySelector('#add-todo-container');
    this.listTodosContainer = document.querySelector('#list-todos-container');
    this.renderAddTodoForm();
  }

  get _todoText() {
    return this.input.value
  }
  
  _resetInput() {
    this.input.value = ''
  }

  renderAddTodoForm() {
    const dynamicContent = { placeholder: 'Add todo' };
    // const formContent = document.querySelector('#addTodoFormTemplate').innerHTML;
    // const formTemplate = Handlebars.compile(formContent);
    const newHTML = Handlebars.templates.addTodoForm(dynamicContent);

    this.addTodoContainer.innerHTML += newHTML;
  }
  
  renderContacts(todos) {
    while (this.listTodosContainer.firstChild) {
      this.listTodosContainer.removeChild(this.listTodosContainer.firstChild);
    }
    // const listContent = document.querySelector('#renderTodosTemplate').innerHTML;
    // const listTemplate = Handlebars.templates.renderTodos(listContent);
    const newHTML = Handlebars.templates.renderTodos({todos: todos});
    
    this.listTodosContainer.innerHTML += newHTML;
  }

  bindAddTodo(handler) {
    let form = this.addTodoContainer.querySelector('form');
    
    form.addEventListener('submit', event => {
      event.preventDefault()
      let newTodo = form.querySelector('input');

      if (newTodo.value) {
        handler(newTodo.value)
        newTodo.value = '';
      }
    })
  }

  bindDeleteTodo(handler) {
    this.listTodosContainer.addEventListener('click', event => {
      if (event.target.className === 'delete') {
        const id = parseInt(event.target.parentElement.id)
        handler(id)
      }
    })
  }
  
  bindToggleTodo(handler) {
    this.listTodosContainer.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.id)
        handler(id)
      }
    })
  }
};

export default View;