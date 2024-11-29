const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  responses: [{
    studentEmail: String,
    fileUrl: String
  }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);

