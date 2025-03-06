const taskService = require('../services/taskService');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await taskService.createTask({
            title,
            description,
            completed: false,
            userId: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.user.id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks for the logged-in user
exports.getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const tasks = await taskService.getTask(id, req.user.id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = await taskService.updateTask(id, req.user.id, { title, description, completed });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskService.deleteTask(id, req.user.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};