
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Jeffrin:mepco2023@citizen.qp9z4.mongodb.net/citizen_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Schema and Model
const questionSchema = new mongoose.Schema({
    qid: { type: String, unique: true, required: true }, // Custom question ID
    question: { type: String, required: true },
    options: { type: [String], required: true }, // Array of options
    correct_answer: { type: String, required: true },
    points_added: { type: Number, required: true }, // Points added for correct answer
    points_reduced: { type: Number, required: true }, // Points reduced for incorrect answer
    article: { type: String, required: true }, // New field: article reference
    part: { type: String, required: true },    // New field: part reference
});

// module.exports = mongoose.model('Monopoly', questionSchema);

// // Routes

// // Get all questions
// app.get('/api/questions', async (req, res) => {
//     try {
//         const questions = await Monopoly.find();
//         res.json(questions);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get a specific question by qid
// app.get('/api/questions/qid/:qid', async (req, res) => {
//     try {
//         const question = await Monopoly.findOne({ qid: req.params.qid });
//         console.log(question);
//         if (!question) {
//             return res.status(404).json({ message: 'Question not found' });
//         }
//         res.json(question);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Add a new question
// app.post('/api/questions', async (req, res) => {
//     try {
//         const question = new Monopoly(req.body);
//         await question.save();
//         res.status(201).json(question);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Update an existing question by qid
// app.put('/api/questions/qid/:qid', async (req, res) => {
//     try {
//         const question = await Monopoly.findOneAndUpdate({ qid: req.params.qid }, req.body, { new: true });
//         if (!question) {
//             return res.status(404).json({ message: 'Question not found' });
//         }
//         res.json(question);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Delete a question by qid
// app.delete('/api/questions/qid/:qid', async (req, res) => {
//     try {
//         const question = await Monopoly.findOneAndDelete({ qid: req.params.qid });
//         if (!question) {
//             return res.status(404).json({ message: 'Question not found' });
//         }
//         res.status(204).end();
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


const Monopoly = mongoose.model('Monopoly', questionSchema);

// Routes

// Get all questions
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Monopoly.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific question by qid
app.get('/api/questions/qid/:qid', async (req, res) => {
    try {
        const question = await Monopoly.findOne({ qid: req.params.qid });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new question
app.post('/api/questions', async (req, res) => {
    try {
        const question = new Monopoly(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing question by qid
app.put('/api/questions/qid/:qid', async (req, res) => {
    try {
        const question = await Monopoly.findOneAndUpdate({ qid: req.params.qid }, req.body, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a question by qid
app.delete('/api/questions/qid/:qid', async (req, res) => {
    try {
        const question = await Monopoly.findOneAndDelete({ qid: req.params.qid });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
