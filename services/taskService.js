const Task = require('../models/taskModel');

const createTask = async (taskData) => {
    const task = new Task(taskData);
    await task.save();
    return task;
};

const getTasks = async (userId) => {
    const tasks = await Task.find({ userId });
    return tasks;
};

const getTask = async (id, userId) => {
    const tasks = await Task.findOne({ _id: id, userId });
    return tasks;
};

const updateTask = async (id, userId, taskData) => {
    const task = await Task.findByIdAndUpdate({ _id: id, userId}, taskData, { new: true });
    return task;
};

const deleteTask = async (id, userId) => {
    const task = await Task.delete({ _id: id, userId });
    return task;
};

module.exports = {
    createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask
};
