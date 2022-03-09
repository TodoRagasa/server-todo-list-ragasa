const {validationResult} = require('express-validator');

const validateFields = (req, resp, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return resp.status(400).json(errors);
    }
    next();
}

module.exports = {
    validateFields
}
