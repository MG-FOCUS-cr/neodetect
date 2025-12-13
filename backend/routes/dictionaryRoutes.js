const express = require('express');
const router = express.Router();
const OfficialDictionary = require('../models/OfficialDictionary');
const AlgerianLexicon = require('../models/AlgerianLexicon');

// Official Dictionary Routes
router.get('/official', async (req, res) => {
    try {
        const words = await OfficialDictionary.find().sort({ createdAt: -1 });
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/official', async (req, res) => {
    try {
        const word = new OfficialDictionary(req.body);
        const savedWord = await word.save();
        res.status(201).json(savedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/official/:id', async (req, res) => {
    try {
        await OfficialDictionary.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Algerian Lexicon Routes
router.get('/algerian', async (req, res) => {
    try {
        const words = await AlgerianLexicon.find().sort({ createdAt: -1 });
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/algerian', async (req, res) => {
    try {
        const word = new AlgerianLexicon(req.body);
        const savedWord = await word.save();
        res.status(201).json(savedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/algerian/:id', async (req, res) => {
    try {
        await AlgerianLexicon.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;