// src/controllers/questionController.js

const axios = require('axios');  // For calling GPT-4 API
const Question = require('../models/questionModel');  // MongoDB model

// Generate a new question using Azure OpenAI
exports.PromptGeneratedQuestions = async (req, res) => {
    try 
    {
        const { topic, difficulty, subject, chapter } = req.body;
        
        // const prompt = `
        // Generate 5 ${difficulty}-level multiple-choice physics questions on the topic "${topic}".
        // Include 4 options, the correct answer, and the chapter name.
        // Format each question as:
        // {
        //     "question": "<question>",
        //     "options": ["<A>", "<B>", "<C>", "<D>"],
        //     "correctAnswer": "<correctOption>",
        //     "difficulty": "${difficulty}",
        //     "chapter": "${chapter}",
        //     "topic": "${topic}"
        // }
            
        // Response should contain a list of 5 questions in JSON format.`;

        const prompt = `You are a top class physics teacher who generates 5 hard level multiple-choice questions on the topic ${topic} for the subject ${subject} and chapter ${chapter}.
        Format each question as:
        {
            "question": "<question>",
            "options": ["<A>", "<B>", "<C>", "<D>"],
            "correctAnswer": "<correctOption>",
            "difficulty": "${difficulty}",
            "chapter": "${chapter}",
            "topic": "${topic}"
        }
            
        Response should contain a list of 5 questions in JSON format.`;

        // log the prompt for debugging
        console.log('Prompt:', prompt);

        const payload = {
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 2000
        };

        // Send request to Azure OpenAI API
        const response = await axios.post(process.env.AZURE_OPENAI_ENDPOINT, payload, {
            headers: {
                'api-key': process.env.AZURE_OPENAI_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        // Log the full response for debugging
        console.log('Full response from Azure OpenAI API:', response.data);

        // Extract the generated question from the response
        const responseContent = response.data.choices && response.data.choices[0] && response.data.choices[0].message
            ? response.data.choices[0].message.content
            : 'No question generated';
        

        // Remove any non-JSON parts from the response
        const jsonStartIndex = responseContent.indexOf('[');
        const jsonEndIndex = responseContent.lastIndexOf(']') + 1;
        const jsonString = responseContent.substring(jsonStartIndex, jsonEndIndex);

        const generatedQuestions = JSON.parse(jsonString);

        // const generatedData = response.data.choices[0].message.content;

        // Parse the GPT response into JSON
        // const questionData = JSON.parse(generatedData);

        // Save to the database
        // const newQuestion = new Question({
        //     question: questionData.question,
        //     options: questionData.options,
        //     difficulty: questionData.difficulty,
        //     chapter: questionData.chapter,
        //     topic: questionData.topic,
        //     correctAnswer: questionData.correctAnswer
        // });

        // await newQuestion.save();

        // Save each question individually
        const savedQuestions = await Question.insertMany(generatedQuestions.map(q => ({
            subject,
            chapter,
            topic,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            difficulty: q.difficulty
        })));

        res.status(201).json({ message: 'Question generated and stored successfully', savedQuestions });
        // res.status(200).json({ message: 'Question generated successfully', question: generatedQuestion });
    } 
    catch (error) {
        console.error('Error generating question:', error.message);
        res.status(500).json({ message: 'Error generating question', error: error.message });
    }
};

// Store a generated question in MongoDB
exports.storeQuestion = async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json({ message: 'Question stored successfully', newQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Error storing question', error });
    }
};

// Fetch all stored questions from MongoDB
exports.fetchQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};
