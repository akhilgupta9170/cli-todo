const fs = require('fs');

class Todo {
    constructor() {
        this.filepath = "todos.json";
        this.loadTodos();
    }

    loadTodos() {
        if (!fs.existsSync(this.filepath)) {
            fs.writeFile(this.filepath, JSON.stringify([]), (err) => {
                if (err) console.error(err);
            });
        }
    }

    async readTodos() {
        try {
            const data = await fs.promises.readFile(this.filepath, 'utf8');
            return data ? JSON.parse(data) : [];
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async writeTodos(todos) {
        try {
            await fs.promises.writeFile(this.filepath, JSON.stringify(todos, null, 2));
            console.log('File written successfully');
        } catch (err) {
            console.error(err);
        }
    }

    async createTodo(title, description) {
        const todos = await this.readTodos();
        const newTodo = {
            title,
            description,
            completed: false,
            id: Date.now()
        };

        todos.push(newTodo);
        await this.writeTodos(todos);
        console.log('Todo added successfully');
    }

    async deleteTodo(title) {
        const todos = await this.readTodos();
        const filteredTodos = todos.filter(todo => todo.title !== title);
        await this.writeTodos(filteredTodos);
        console.log('Todo deleted successfully');
    }

    async getTodos() {
        const todos = await this.readTodos();
        console.log(todos);
    }

    async updateTodo(title, updatedTitle, updatedDescription) {
        const todos = await this.readTodos();
        const updatedTodos = todos.map(todo => {
            if (todo.title === title) {
                return { ...todo, title: updatedTitle, description: updatedDescription };
            }
            return todo;
        });
        await this.writeTodos(updatedTodos);
        console.log('Todo updated successfully');
    }
}

// Creating a new object
const todoApp = new Todo();
todoApp.createTodo("Go to bed","rest favorite");

// todoApp.getTodos();

module.exports = Todo;
