const {Schema, model} = require('mongoose');

const TodoSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    complete: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String
    }
});

TodoSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Todo', TodoSchema);
