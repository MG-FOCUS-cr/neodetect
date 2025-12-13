const express = require('express');
const router = express.Router();
const {
    getWords,
    getWordById,
    createWord,
    updateWord,
    deleteWord,
    getStats
} = require('../controllers/wordController');

// Public routes
router.get('/', getWords);
router.post('/', createWord);
router.get('/stats/dashboard', getStats); // Order matters! specific paths before /:id
router.get('/:id', getWordById);
router.put('/:id', updateWord);
router.delete('/:id', deleteWord);

module.exports = router;
