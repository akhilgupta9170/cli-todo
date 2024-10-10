const todo = require('./index.js');
const yargs = require('yargs');
// console.log(process.argv)

yargs.command({
    command: 'create',
    describe: 'Create a new todo',
    builder: {
        title: {
            description: 'Title of the todo',
            type: 'string',
            demandOption: true
        },
        description: {
            description: 'Description of the todo',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        const { title, description } = argv;
        const newTodo = new todo();
        newTodo.createTodo(title, description);
    }

})
    .command({
        command: 'delete',
        describe: 'Delete a todo by id',
        builder: {
            id: {
                description: 'id of the todo to delete',
                type: Number,
                demandOption: true
            }
        },
        handler(argv) {
            const { id } = argv;
            const newTodo = new todo();
            newTodo.deleteTodo(id);
        }

    })


    .command({
        command: 'update',
        describe: 'Update a todo by id',
        builder: {
            id: {
                description: 'id of the todo to update',
                type: Number,
                demandOption: true
            },
            updatedTitle: {
                description: 'Updated title of the todo',
                type: 'string',
                demandOption: false
            },
            updatedDescription: {
                description: 'Updated description of the todo',
                type: 'string',
                demandOption: false
            }
        },
        handler(argv) {
            const { id, updatedTitle, updatedDescription } = argv;
            const newTodo = new todo();
            newTodo.updateTodo(id, updatedTitle, updatedDescription);
        }

    })

    .command({
        command: 'list',
        alias: 'ls',
        describe: 'List all todos',
        handler() {
            const newTodo = new todo();
            newTodo.getTodos();
        }
    })

yargs.parse()