const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctAnswerIndex: {
        type: Number,
        required: true,
      },
    },
  ],
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);

module.exports = QuizQuestion;