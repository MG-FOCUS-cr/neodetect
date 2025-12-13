const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    originalText: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    neologismsFound: [{
        term: String,
        definition: String,
        origin: String,
        culturalExplanation: String,
        morphology: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analysis', analysisSchema);
