const { Schema, model } = require('mongoose');

const NoteTypeSchema = Schema({
    noteType: {
        type: String,
        required: [true, 'Note type field is required']
    }
})

module.exports = model('NoteType', NoteTypeSchema);