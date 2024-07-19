const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/quote-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Quote Schema and Model
const quoteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],
    backgroundImage: String,
    audio: String
});

const Quote = mongoose.model('Quote', quoteSchema);

// Routes
app.post('/quotes', async (req, res) => {
    try {
        const quote = new Quote(req.body);
        await quote.save();
        res.send(quote);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/quotes', async (req, res) => {
    try {
        const localQuotes = await Quote.find();
        const response = await axios.get('https://type.fit/api/quotes');
        const apiQuotes = response.data.slice(0, 10); // Limit to 10 quotes for simplicity
        res.send([...localQuotes, ...apiQuotes]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/quotes/:id', async (req, res) => {
    try {
        await Quote.findByIdAndDelete(req.params.id);
        res.send({ message: 'Quote deleted' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

