const mongoose = require('mongoose');

const officialDictionarySchema = new mongoose.Schema({
    term: {
        type: String,
        required: true,
        unique: true
    },
    definition: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('OfficialDictionary', officialDictionarySchema);