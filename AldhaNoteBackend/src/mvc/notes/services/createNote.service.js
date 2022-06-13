const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const createNote = async ({ ...noteData }) => {
    const { user, type, name, content } = noteData;
    const newNote = new NoteModel({
        user,
        type,
        name,
        content
    });

    const foundUser = await UserModel.findById(user);
    if (!foundUser) {
        throw new HTTP404Error('Could not find user for provided id');
    }

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        await newNote.save({ session });
        await foundUser.notes.push(newNote);
        await foundUser.save({ session });
    });
    await session.endSession();

    return newNote;
};

module.exports = { createNote };
