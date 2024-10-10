const fs = require('fs');

class Todo {
    constructor(title, description, updatedTitle, updatedDescription) {
        this.title = title ? title.toLowerCase() : null;
        this.description = description ? description.toLowerCase() : null;
        this.updatedTitle = updatedTitle ? updatedTitle.toLowerCase() : null;
        this.updatedDescription = updatedDescription ? updatedDescription.toLowerCase() : null;
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

    async createTodo() {
        const todos = await this.readTodos();
        const existingTodo = todos.find(todo => todo.title === this.title && todo.description === this.description);
        if (existingTodo) {
            console.log('Todo with the same title already exists');
            return;
        }
        const newTodo = {
            title: this.title,
            description: this.description,
            id: Date.now()
        };

        todos.push(newTodo);
        await this.writeTodos(todos);
        console.log('Todo added successfully');
    }

    async deleteTodo() {
        const todos = await this.readTodos();
        if (todos.length == 0) {
            console.log('todos has no tasks');
            return;
        }
        const filteredTodos = todos.filter(todo => todo.title !== this.title);
        await this.writeTodos(filteredTodos);
        console.log('Todo deleted successfully');
    }

    async getTodos() {
        const todos = await this.readTodos();
        console.log(todos);
    }

    async updateTodo() {
        const todos = await this.readTodos();
        if (todos.length == 0) {
            console.log('todos has no tasks');
            return;
        }
        if (this.updatedTitle === null || this.updatedDescription === null) {
            console.log('Please provide both updatedTitle and updatedDescription');
            return;
        }
        const existingTodo = todos.find(todo => todo.title === this.updatedTitle && todo.description === this.updatedDescription);
        if (!existingTodo) {
            console.log('No todo found with the given title and description');
            return;
        }

        const updatedTodos = todos.map(todo => {
            if (todo.title === this.title) {
                return {
                    title: this.updatedTitle,
                    description: this.updatedDescription,
                    completed: todo.completed
                };
            }
            return todo;
        });
        await this.writeTodos(updatedTodos);
        console.log('Todo updated successfully');
    }
}

// // Creating a new object
// const todoApp = new Todo();
// todoApp.createTodo("Go to school", "Study hard");

// // todoApp.getTodos();

module.exports = Todo;
