const fs = require('fs');

class Todo {
    constructor() {
        this.filepath = "todos.json";
        this.loadTodos();
    }

    loadTodos() {
        if (!fs.existsSync(this.filepath)) {
            fs.writeFileSync(this.filepath, JSON.stringify([]));
        }
    }
    createTodo(title, description) {
        const todos = JSON.parse(fs.readFileSync(this.filepath));
        const newTodo = {
            title,
            description,
            completed: false,
            id: Date.now()
        };
        todos.push(newTodo);
        fs.writeFileSync(this.filepath, JSON.stringify(todos));
        return newTodo;

    }
    deleteTodo(title) {
        const todos = JSON.parse(fs.readFileSync(this.filepath));
        const index = todos.findIndex(todo => todo.title === title );
        if (index > -1) {
            todos.splice(index, 1);
            fs.writeFileSync(this.filepath, JSON.stringify(todos));
            return true;
        }
        return false;
    }


    getTodos() {
        return JSON.parse(fs.readFileSync(this.filepath));
    }

    updateTodo(title, updatedTitle, updatedDescription) {
        const todos = JSON.parse(fs.readFileSync(this.filepath));
        const index = todos.findIndex(todo => todo.title === title);
        if (index > -1) {
            todos[index].title = updatedTitle;
            todos[index].description = updatedDescription;
            fs.writeFileSync(this.filepath, JSON.stringify(todos));
            return true;
        }
        return false;
    }



}
// creating a new object
const todoApp = new Todo();

todoApp.createTodo("Hello World","Hello World")
// console.log(todoApp.getTodos())




module.exports = Todo;


