// src/models/questionModel.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    topic: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;



// difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }, // Difficulty level