const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: [true, 'must provide a type'],
        trim: true,
    },
    // type: {
    //     type: Schema.Types.ObjectId,
    //     ref: "NoteType",
    //     required: true,
    // },
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxLength: [20, 'name can not be more than 20 characters'],
    },
    content: {
        type: String,
    },
});

NotesSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
};

module.exports = model('Notes', NotesSchema);