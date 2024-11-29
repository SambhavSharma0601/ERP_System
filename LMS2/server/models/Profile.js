// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 name: String,
 rollNumber: String,
 group: String,
 branch: String,
 session: String,
 coursesEnrolledIn: [String],
 parentsName: String,
 address: String,
 bloodGroup: String,
 // Add more fields as needed
});

module.exports = mongoose.model('Profile', profileSchema);
