// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   role: { type: String, enum: ['student', 'teacher'], default: 'student' },
//   otp: String
// });

// module.exports = mongoose.model('User', userSchema);
// models/Users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 email: { type: String, required: true, unique: true },
//  password: { type: String, required: true },
 role: { type: String, enum: ['teacher', 'student'], default: 'student' },
 otp: String
});

module.exports = mongoose.model('User', userSchema);
