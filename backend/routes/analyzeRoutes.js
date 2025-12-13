const express = require('express');
const router = express.Router();
const { analyzeText, getAllAnalyses, getAnalysisById } = require('../controllers/analyzeController');
// const { protect } = require('../middleware/authMiddleware'); // Optional: Protect this route

router.post('/', analyzeText);
router.get('/history', getAllAnalyses);
router.get('/:id', getAnalysisById);

module.exports = router;
