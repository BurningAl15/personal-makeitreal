const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const noteSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    // type: { type: Types.ObjectId, ref: 'NoteType', required: true },
    name: { type: String, required: true },
    content: { type: String },
    image: { type: String },
    imageId: { type: String },
    list: [{ type: String }],
});

module.exports = model('Note', noteSchema);
