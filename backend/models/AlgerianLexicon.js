const mongoose = require('mongoose');

const algerianLexiconSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true,
        unique: true
    },
    definition: {
        type: String,
        required: true
    },
    origin: {
        type: String
    },
    type: {
        type: String,
        enum: ['hybridation', 'mot-valise', 'emprunt', 'derivation', 'composition']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AlgerianLexicon', algerianLexiconSchema);