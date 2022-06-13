const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const noteTypeSchema = Schema({
    noteType: {
        type: String,
        required: [true, 'Note type field is required']
    }
})

module.exports = model('NoteType', noteTypeSchema);