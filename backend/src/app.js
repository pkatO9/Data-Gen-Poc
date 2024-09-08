const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Question Generator API is running!');
});

// Route for questions
const questionRoutes = require('./routes/questionRoutes');
app.use('/api/questions', questionRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
