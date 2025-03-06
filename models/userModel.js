const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.index({ email: 1, deleted: 1 }, { unique: true });

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Add the mongoose-delete plugin to the schema
userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const User = mongoose.model('User', userSchema);

module.exports = User;