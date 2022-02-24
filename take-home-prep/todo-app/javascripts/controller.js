class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view,

    this.model.bindTodoListChanged(this.onTodoListChanged.bind(this)),
    this.view.bindAddTodo(this.handleAddTodo.bind(this)),
    this.view.bindDeleteTodo(this.handleDeleteTodo),
    this.view.bindToggleTodo(this.handleToggleTodo),

    this.onTodoListChanged(this.model.todos)
  }
  
  onTodoListChanged(contacts) {
    this.view.renderContacts(contacts);
  }

  handleAddTodo(newTodoText) {
    this.model.addTodo(newTodoText);
  }

  handleDeleteTodo = (id, updatedText) => {
    this.model.deleteTodo(id, updatedText);
  }

  handleToggleTodo = (id) => {
    this.model.toggleTodo(id);
  }
}

export default Controller;


