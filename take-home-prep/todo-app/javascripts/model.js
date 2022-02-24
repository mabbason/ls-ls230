
class Model {
  constructor() {
    //this is the state, all of the data
    this.todos = [
      {id: 1, text: 'Practice Contact Manager App', complete: false},
      {id: 2, text: 'Practice w Handlebars', complete: false}
    ]
  }
  //All the model methods are essentially the CRUD actions
  // createTodo, readTodo, updateTodo, deleteTodo methods

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback
  }

  addTodo(newTodoTxt) {
    let lastTodoId = this.todos.slice(-1)[0].id;
    const newTodo = {
      id: this.todos.length > 0 ?  lastTodoId + 1: 1,
      text: newTodoTxt,
      complete: false,
    }
    this.todos.push(newTodo);
    this.onTodoListChanged(this.todos)
  }

  editTodo(id, updatedTxt) {
    this.todos.find(todo => todo.id === id).text = updatedTxt;
    this.onTodoListChanged(this.todos)
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.onTodoListChanged(this.todos)
  }

  toggleTodo(id) {
    let todo = this.todos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    this.onTodoListChanged(this.todos)
  }

};

export default Model;