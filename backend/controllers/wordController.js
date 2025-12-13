const Word = require('../models/Word');

// @desc    Get all words (with filters)
// @route   GET /api/words
// @access  Public
const getWords = async (req, res) => {
    try {
        const { search, status } = req.query;
        let query = {};

        if (status) {
            query.status = status;
        } else {
            // Updated: Show all by default or strictly approved if needed. 
            // Since auth is gone, maybe show everything or just approved?
            // Defaulting to showing all for now as it's an open platform.
            // query.status = 'approved'; 
        }

        // Search by term or definition
        if (search) {
            query.$or = [
                { term: { $regex: search, $options: 'i' } },
                { definition: { $regex: search, $options: 'i' } }
            ];
        }

        const words = await Word.find(query).sort({ createdAt: -1 });
        res.status(200).json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single word
// @route   GET /api/words/:id
// @access  Public
const getWordById = async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (!word) {
            return res.status(404).json({ message: 'Mot non trouvé' });
        }
        res.status(200).json(word);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new word (suggestion)
// @route   POST /api/words
// @access  Public
const createWord = async (req, res) => {
    try {
        const { term, definition, examples, origin, tags } = req.body;

        // Check if word already exists
        const exists = await Word.findOne({ term });
        if (exists) {
            return res.status(400).json({ message: 'Ce mot existe déjà dans le lexique' });
        }

        const word = await Word.create({
            term,
            definition,
            examples,
            origin,
            tags,
            // contributor: req.user.id, // Auth removed
            status: 'approved' // Auto-approve since no admin panel
        });

        res.status(201).json(word);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a word
// @route   PUT /api/words/:id
// @access  Public
const updateWord = async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);

        if (!word) {
            return res.status(404).json({ message: 'Mot non trouvé' });
        }

        const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(updatedWord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a word
// @route   DELETE /api/words/:id
// @access  Public
const deleteWord = async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);

        if (!word) {
            return res.status(404).json({ message: 'Mot non trouvé' });
        }

        await word.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Mot supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Dashboard Stats
// @route   GET /api/words/stats/dashboard
// @access  Public
const getStats = async (req, res) => {
    try {
        const totalWords = await Word.countDocuments();
        const approvedWords = await Word.countDocuments({ status: 'approved' });
        const pendingWords = await Word.countDocuments({ status: 'pending' });

        // Mock accuracy (or calculate from user feedback later)
        const accuracy = 87;

        res.status(200).json({
            totalWords,
            approvedWords,
            pendingWords,
            accuracy
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getWords,
    getWordById,
    createWord,
    updateWord,
    deleteWord,
    getStats
};
