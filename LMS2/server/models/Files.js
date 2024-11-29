// models/Files.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
 title: { type: String, required: true },
 type: { type: String, enum: ['Notice', 'Course Material'], required: true },
 file: { type: String, required: true }, // This will store the file path
 uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


module.exports = mongoose.model('File', fileSchema);
