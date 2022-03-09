const Todo = require('../models/todo');

const getTodos = async (req, res) => {
    try {
        const [todos] = await Promise.all([Todo.find({status: true})]);
        res.json(todos);
    } catch (error) {
        console.trace(error);
        res.status(500).json({error: 'Ocurrio un error al obtener los todos.'});
    }
}

/**
 *
 * @param req
 * @param res
 */
const createTodo = async (req, res) => {
    const {name, description} = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    const todo = new Todo({name, description, createdAt, updatedAt});
    try {
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.trace(error);
        res.status(500).json({msj: 'Error to create todo'});
    }
}

const updateTodo = async (req, res) => {
    try {
        const {id, createdAt, ...obj} = req.body;
        const todo = await Todo.findByIdAndUpdate(id, obj, {
            returnOriginal: false
        });
        res.json(todo);
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error al actualizar el todo.'});
    }
}

const updateTodoBulk = async (req, res) => {
    try {
        const promisesToUpdate = req.body.map(({id}) => {
            return Todo.findByIdAndUpdate(id, {complete: true}, {returnOriginal: false})
        });
        const todos = await Promise.all(promisesToUpdate);
        res.json(todos);
    } catch (error) {
        res.status(500).json({msj: 'Ocurrio un error al actualizar los todos.'});
    }
}

const deleteTodoBulk = async (req, res) => {
    console.log('Bulk delete', req.body);
    try {
        const promisesToDelete = req.body.map(async ({id}) => {
            return Todo.findByIdAndUpdate(id, {status: false}, {returnOriginal: false});
        });
        const todos = await Promise.all(promisesToDelete);
        res.json(todos);
    } catch (error) {
        res.status(500).json({msj: 'Ocurrio un error al eliminar los todos.'})
    }
}

const deleteTodo = async (req, res) => {
    const {id} = req.params;
    const todo = await Todo.findByIdAndUpdate(id, {status: false}, {
        returnOriginal: false
    });
    res.json(todo);
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    updateTodoBulk,
    deleteTodo,
    deleteTodoBulk,
}
