const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const showAllNotes = async ({ email }) => {
    console.log("EMAIL: ", email);
    const foundUser = await UserModel.findOne({ email: email });
    console.log("FOUND USER: ", foundUser);
    if (!foundUser) {
        throw new HTTP404Error('Could not find user for provided id');
    }

    const notes = await NoteModel.find({ user: foundUser._id });

    return notes;
}

module.exports = { showAllNotes };