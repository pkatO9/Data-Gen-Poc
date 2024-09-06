const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route for generating a question
router.post('/generate/prompt', questionController.PromptGeneratedQuestions);

// Route for storing a question
router.post('/store', questionController.storeQuestion);

// Route for fetching stored questions
router.get('/fetch', questionController.fetchQuestions);

module.exports = router;
