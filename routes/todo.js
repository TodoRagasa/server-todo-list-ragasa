const {Router} = require('express');
const {check} = require('express-validator');

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    updateTodoBulk,
    deleteTodoBulk
} = require('../controller/todo');
const {validateFields} = require("../middlewares/validate-fields");

const router = Router();

router.get('/', getTodos);

router.post('/', [
        check('name', 'El nombre del todo es requerido').not().isEmpty(),
        check('description', 'La descripcion es requerida').not().isEmpty(),
        validateFields
    ],
    createTodo
);

router.put('/', [
    check('name', 'El nombre del todo es requerido').not().isEmpty(),
    check('description', 'La descripcion es requerida').not().isEmpty(),
    validateFields
], updateTodo);

router.put('/bulk',
    [
        check('name', 'El nombre del todo es requerido').not().isEmpty(),
        check('description', 'La descripcion es requerida').not().isEmpty(),
        validateFields
    ],
    updateTodoBulk
);

router.delete('/:id', deleteTodo);

router.delete('/', deleteTodoBulk);

module.exports = router;




