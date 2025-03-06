// filepath: /workspaces/task-app/task-manager-app/backend/routes/taskRoutes.js
const express = require('express');
const { createTask, getTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncHandler');
const { createTaskValidator, updateTaskValidator } = require('../validators/taskValidator');
const validate = require('../middleware/validate');

const router = express.Router();

// Protect all task routes
router.use(protect);

// Route to create a new task
router.post('/', createTaskValidator, validate, asyncHandler(createTask));

// Route to get all tasks for the logged-in user
router.get('/', asyncHandler(getTasks));

// Route to get all tasks for the logged-in user
router.get('/:id', asyncHandler(getTask));

// Route to update a task by ID
router.put('/:id', updateTaskValidator, validate, asyncHandler(updateTask));

// Route to delete a task by ID
router.delete('/:id', asyncHandler(deleteTask));

module.exports = router;