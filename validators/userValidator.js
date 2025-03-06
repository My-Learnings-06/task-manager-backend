const { body } = require('express-validator');
const User = require('../models/userModel');

exports.registerUserValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .isEmail().withMessage('Please include a valid email')
        .custom(async (email) => {
            const user = await User.findOne({ email, deleted: false });
            if (user) {
                throw new Error('Email already in use');
            }
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.loginUserValidator = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];