const fs = require('fs');


class Todo {
    constructor() {
        this.filepath = './todos.json';
        this.loadTodos();

    }

    loadTodos() {
        if (!fs.existsSync(this.filepath)) {
            fs.writeFile(this.filepath, JSON.stringify([]), (err) => {
                if (err) throw new Error(err);
            });
        }
    }

    async readTodos() {
        try {
            const data = await fs.promises.readFile(this.filepath, 'utf8');
            return data ? JSON.parse(data) : [];
        } catch (err) {
            throw new Error("Couldn't read");

        }
    }

    async writeTodos(todos) {
        try {
            await fs.promises.writeFile(this.filepath, JSON.stringify(todos, null, 2));
            console.log('File written successfully');
        } catch (err) {
            throw new Error("Couldn't write");
        }
    }

    async createTodo(title, description) {
        const todos = await this.readTodos();
        const existingTodo = todos.find((todo) => todo.title === title);
        if (existingTodo) {
            console.log('Todo with the same title already exists');
            return;
        }
        const newTodo = {
            title,
            description,
            id: Date.now()
        };

        todos.push(newTodo);
        await this.writeTodos(todos);
        console.log('Todo added successfully');
    }

    async deleteTodo(id) {
        const todos = await this.readTodos();
        try {
            if (todos.length == 0) {
                throw new Error("List is empty");

            }
        } catch (err) {
            console.log(err);
            return;



        }
        const filteredTodos = todos.filter(todo => todo.id !== id);
        await this.writeTodos(filteredTodos);
        console.log('Todo deleted successfully');
    }


    async getTodos() {
        const todos = await this.readTodos();
        console.log(todos);
    }

    async updateTodo(id, updatedTitle, updatedDescription) {
        const todos = await this.readTodos();
        try{
        if (todos.length == 0) {
            throw new Error("List is empty");

        }
    }catch (err) {
        console.log(err);
        return;
    }
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    id,
                    title: updatedTitle || todo.title,
                    description: updatedDescription || todo.description,


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
