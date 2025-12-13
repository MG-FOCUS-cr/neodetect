const mongoose = require('mongoose');

const neologismSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['hybrid', 'loanword', 'cultural', 'other'],
        default: 'hybrid'
    },
    context: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['detected', 'approved', 'rejected'],
        default: 'detected'
    },
    detectedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Neologism', neologismSchema);
