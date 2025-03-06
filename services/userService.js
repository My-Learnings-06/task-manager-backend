const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.registerUser = async (userData) => {
    const { name, email, password } = userData;
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return user;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return user;
    } else {
        throw new Error('Invalid email or password');
    }
};

exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.softDeleteUser = async (id) => {
    const user = await User.delete({ _id: id });
    return user;
};