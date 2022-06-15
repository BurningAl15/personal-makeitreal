const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const createNote = async ({ ...noteData }) => {
    const { user, type, name, content } = noteData;

    const foundUser = await UserModel.findOne({ email: user.email });
    const modifiedUser = {
        _id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        password: foundUser.password,
    };
    const newNote = new NoteModel({
        user: modifiedUser,
        type,
        name,
        content
    });
    console.log("NEW NOTE: ", newNote);

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
    console.log("DONE!");
    return newNote;
};

module.exports = { createNote };
