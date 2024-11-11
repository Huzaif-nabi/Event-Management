const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String }, // For Google OAuth
  date: { type: Date, default: Date.now }
});

// Hash password before saving (only for email/password signups)
UserSchema.pre('save', async function (next) {
  // Only hash password if it is new or modified
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to check password for email/password signins
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Check if the User model is already compiled
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
