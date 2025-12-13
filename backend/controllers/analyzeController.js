const Analysis = require('../models/Analysis');
const OfficialDictionary = require('../models/OfficialDictionary');
const AlgerianLexicon = require('../models/AlgerianLexicon');
const { analyzeTextWithDeepSeek } = require('../services/deepseekService');

// @desc    Analyze text for neologisms
// @route   POST /api/analyze
// @access  Public
// @desc    Get all analyses
// @route   GET /api/analyze/history
// @access  Public
const getAllAnalyses = async (req, res) => {
    try {
        const analyses = await Analysis.find().sort({ createdAt: -1 });
        res.status(200).json(analyses);
    } catch (error) {
        console.error("Error fetching analyses:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des analyses" });
    }
};

const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Le texte est requis pour l'analyse." });
        }

        // 1. Extract words from text
        const words = text.toLowerCase().split(/\s+/);
        const processedWords = [];
        const aiCandidates = [];
        
        for (const word of words) {
            const cleanWord = word.replace(/[^a-zA-ZÀ-ſ]/g, '');
            if (cleanWord.length < 3) continue;
            
            // Step 1: Check Official Dictionary
            const inOfficial = await OfficialDictionary.findOne({ term: new RegExp(`^${cleanWord}$`, 'i') });
            if (inOfficial) {
                console.log(`${cleanWord} found in Official Dictionary - NOT a neologism`);
                continue; // Ignore - not a neologism
            }
            
            // Step 2: Check Algerian Lexicon
            const inAlgerian = await AlgerianLexicon.findOne({ term: new RegExp(`^${cleanWord}$`, 'i') });
            if (inAlgerian) {
                console.log(`${cleanWord} found in Algerian Lexicon - reusing meaning`);
                processedWords.push({
                    term: cleanWord,
                    definition: inAlgerian.definition,
                    origin: inAlgerian.origin || 'Algerian',
                    type: inAlgerian.type,
                    source: 'lexicon'
                });
            } else {
                console.log(`${cleanWord} not found - sending to AI`);
                aiCandidates.push(cleanWord);
            }
        }
        
        // 3. Send only unknown words to AI
        let aiResults = [];
        if (aiCandidates.length > 0) {
            const aiAnalysis = await analyzeTextWithDeepSeek(aiCandidates.join(' '), aiCandidates);
            aiResults = aiAnalysis.neologismsFound || [];
        }
        
        // 4. Combine results
        const allNeologisms = [...processedWords, ...aiResults];
        const analysisResult = {
            resume: `Analyse de ${words.length} mots: ${processedWords.length} trouvés dans le lexique algérien, ${aiResults.length} analysés par IA.`,
            neologismsFound: allNeologisms
        };

        // 2. Save to MongoDB (only if connected)
        const mongoose = require('mongoose');
        let finalResult = {
            originalText: text,
            ...analysisResult
        };

        if (mongoose.connection.readyState === 1) {
            try {
                const newAnalysis = new Analysis({
                    originalText: text,
                    resume: analysisResult.resume,
                    neologismsFound: analysisResult.neologismsFound
                });
                finalResult = await newAnalysis.save();
            } catch (dbError) {
                console.error("Failed to save analysis to DB:", dbError);
            }
        }

        // 3. Send response to frontend
        res.status(200).json(finalResult);

    } catch (error) {
        console.error("Error in analyzeText:", error.message);

        if (error.message.includes("Unauthorized")) {
            return res.status(401).json({ message: "Erreur d'authentification API (Clé invalide)" });
        }
        if (error.message.includes("Too Many Requests")) {
            return res.status(429).json({ message: "Trop de requêtes, veuillez réessayer plus tard." });
        }

        // Generic 502 for other upstream errors (like validation failure after retries)
        res.status(502).json({
            message: "Machi men 3andna (Erreur serveur externe)",
            details: error.message
        });
    }
};

// @desc    Get single analysis by ID
// @route   GET /api/analyze/:id
// @access  Public
const getAnalysisById = async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id);
        if (!analysis) {
            return res.status(404).json({ message: 'Analyse introuvable' });
        }
        res.status(200).json(analysis);
    } catch (error) {
        console.error('Error fetching analysis:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'analyse' });
    }
};

module.exports = { analyzeText, getAllAnalyses, getAnalysisById };
