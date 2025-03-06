const { body } = require('express-validator');

exports.createTaskValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
];

exports.updateTaskValidator = [
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('description').optional().notEmpty().withMessage('Description is required'),
    body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
];