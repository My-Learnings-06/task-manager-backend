const userService = require('../services/userService');

// Helper function to set token in HTTP-only cookie
const setTokenCookie = (res, token) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    res.cookie('token', token, options);
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userService.registerUser({ name, email, password });
        const token = userService.generateToken(user._id);
        setTokenCookie(res, token);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Authenticate user and get token
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.loginUser(email, password);
        const token = userService.generateToken(user._id);
        setTokenCookie(res, token);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Logout user and get token
exports.logoutUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        res.cookie('token', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    const user = req.user;
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email
    });
};

// Soft delete user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.softDeleteUser(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({'message': 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};