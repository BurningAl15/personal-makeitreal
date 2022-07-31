const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const removeNote = async ({ ...noteData }) => {
    const { user, noteId } = noteData;
    const foundUser = await UserModel.findOne({ email: user.email });
    if (!foundUser) {
        throw new HTTP404Error('Could not find user for provided id');
    }
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);
    const notes = [...foundUser.notes].filter((note) => note.name !== deletedNote.name);

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        foundUser.notes = await notes;
        // await foundUser.notes.delete;
        await foundUser.save({ session });
    });
    await session.endSession();

    return deletedNote;
};

module.exports = { removeNote };
