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
        const newTodo = new todo(title, description);
        newTodo.createTodo();
    }

})
    .command({
        command: 'delete',
        describe: 'Delete a todo by title',
        builder: {
            title: {
                description: 'Title of the todo to delete',
                type: 'string',
                demandOption: true
            }
        },
        handler(argv) {
            const { title } = argv;
            const newTodo = new todo(title);
            newTodo.deleteTodo();
        }

    })


    .command({
        command: 'update',
        describe: 'Update a todo by title',
        builder: {
            title: {
                description: 'Title of the todo to update',
                type: 'string',
                demandOption: true
            },
            updatedTitle: {
                description: 'Updated title of the todo',
                type: 'string',
                demandOption: true
            },
            updatedDescription: {
                description: 'Updated description of the todo',
                type: 'string',
                demandOption: true
            }
        },
        handler(argv) {
            const { title, updatedTitle, updatedDescription } = argv;
            const newTodo = new todo(title, updatedTitle, updatedDescription);
            newTodo.updateTodo();
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