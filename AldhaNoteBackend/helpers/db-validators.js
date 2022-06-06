const NoteType = require('../models/NoteType');
const User = require('../models/User');

const isValidNoteType = async (noteType = '') => {
    const existantNoteType = await NoteType.findOne({ noteType });
    if (!existantNoteType) {
        console.log("NOTE TYPE NO EXISTS IN DB");
        throw new Error(`The ${noteType} note type is not registered in DB`);
    }
}

const isValidEmail = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`Email ${email} is already registered`)
    }
}

const isValidUserById = async (id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`User with ${id} as id is not registered`);
    }
}

module.exports = { isValidNoteType, isValidEmail, isValidUserById };