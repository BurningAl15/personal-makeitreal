const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const editNote = async ({ ...noteData }) => {
    const { user, type, name, content, noteId, image, imageId, list } = noteData;

    const foundUser = await UserModel.findOne({ email: user.email });
    const modifiedUser = {
        _id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        password: foundUser.password,
    };

    const newEditedNote = {
        user: modifiedUser,
        type,
        name,
        content,
        image,
        imageId,
        list
    };

    if (!foundUser) {
        throw new HTTP404Error('Could not find user for provided id');
    }

    const editedNote = await NoteModel.findByIdAndUpdate(noteId, newEditedNote);

    return editedNote;
};

module.exports = { editNote };
