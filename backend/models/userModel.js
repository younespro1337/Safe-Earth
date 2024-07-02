const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    referenceNumber: {
        type: String,
        required: function() {
            return this.role === 'admin'; 
        }
    },
    receiveUpdates: {
        type: Boolean,
        default: false 
    }
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, "-WW!DAt3YQU+=2aRyKdxc-g8Kc55RkMf4vHN+7=J8M%@!q#a96");
    return token;
};

// Create the User model
const User = mongoose.model('Users-SafeEarth', userSchema);

module.exports = User;
