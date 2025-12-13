const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    term: {
        type: String,
        required: [true, 'Please add a term'],
        trim: true,
        unique: true
    },
    definition: {
        type: String,
        required: [true, 'Please add a definition']
    },
    examples: [{
        type: String
    }],
    origin: {
        type: String, // e.g., "Street slang", "Internet", "Academic"
        default: 'Uknown'
    },
    tags: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    contributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    confidenceScore: {
        type: Number, // 0.0 to 1.0 (from AI)
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Word', wordSchema);
