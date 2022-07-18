const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const showSpecificNotes = async ({ ...noteData }) => {
    const { email, type } = noteData;

    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) {
        throw new HTTP404Error('Could not find user for provided id');
    }

    const notes = await NoteModel.find({ user: foundUser._id, type: type });

    return notes;
}

module.exports = { showSpecificNotes };