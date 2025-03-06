const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Add the mongoose-delete plugin to the schema
taskSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;