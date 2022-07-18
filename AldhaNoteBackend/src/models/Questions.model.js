const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const questionSchema = Schema({
    question: {
        type: String,
        required: [true, 'Question field is required']
    }
})

module.exports = model('Question', questionSchema);