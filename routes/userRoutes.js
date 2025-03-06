const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncHandler');
const { registerUserValidator, loginUserValidator } = require('../validators/userValidator');
const validate = require('../middleware/validate');

const router = express.Router();

// Register a new user
router.post('/register', registerUserValidator, validate, asyncHandler(registerUser));

// Authenticate user and get token
router.post('/login', loginUserValidator, validate, asyncHandler(loginUser));

// Authenticate user and get token
router.post('/logout', protect, asyncHandler(logoutUser));

// Get user profile
router.get('/profile', protect, asyncHandler(getUserProfile));

// Soft delete user
router.delete('/:id', protect, asyncHandler(deleteUser));

module.exports = router;