const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const showOneNote = async ({ id }) => {
    // const foundUser = await UserModel.findOne({ email: email });
    // if (!foundUser) {
    //     throw new HTTP404Error('Could not find user for provided id');
    // }
    const note = await NoteModel.findById(id);

    return note;
}

module.exports = { showOneNote };