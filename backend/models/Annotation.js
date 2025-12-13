const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Annotation content cannot be empty']
    },
    type: {
        type: String,
        enum: ['correction', 'etymology', 'usage_note'],
        default: 'usage_note'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Annotation', annotationSchema);
