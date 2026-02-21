const mongoose = require('mongoose');

const ADMIN_EMAILS = ['nathanielcook345@gmail.com'];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' }
}, { timestamps: true });

userSchema.statics.ADMIN_EMAILS = ADMIN_EMAILS;

userSchema.statics.roleForEmail = function (email) {
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'viewer';
};

module.exports = mongoose.model('User', userSchema);