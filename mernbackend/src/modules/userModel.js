// src/modules/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that each email is unique
        validate: {
            validator: function(v) {
                return /.+\@.+\..+/.test(v); // Basic email format validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    }
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10); // Generate a salt
            this.password = await bcrypt.hash(this.password, salt); // Hash the password
            next();
        } catch (error) {
            next(error);
        }
    } else {
        return next();
    }
});

// Method to compare hashed passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Compare the stored hashed password with the provided password
};

// Create and export the User model
const User = mongoose.model('Users', userSchema);
module.exports = User;
