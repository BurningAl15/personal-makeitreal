const mongoose = require('mongoose');
const NoteModel = require('../../../models/Notes.model');
const UserModel = require('../../../models/User.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');
const { cloudinary, UPLOAD_PRESET } = require('../../../config/cloudinary')

const createNote = async ({ ...noteData }) => {
    const { user, type, name, content, image, list } = noteData;

    let cloudinaryImage = { url: '', public_id: '' };
    if (type === 'image') {
        cloudinaryImage = await cloudinary.uploader.upload(image, { upload_preset: UPLOAD_PRESET });
    }

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
        content,
        image: cloudinaryImage.url,
        imageId: cloudinaryImage.public_id,
        list
    });

    if (!foundUser) {
        throw new HTTP404Error('Could not find user for provided id');
    }

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        for (let i = 0; i < list.length; i++) {
            await newNote.list.push(list[i]);
        }
        await newNote.save({ session });
        await foundUser.notes.push(newNote);
        await foundUser.save({ session });
    });

    await session.endSession();
    return newNote;
};

module.exports = { createNote };
