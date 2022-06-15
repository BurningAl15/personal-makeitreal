const NoteTypeModel = require('../../../models/NoteType.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const showAllNoteTypes = async () => {
    const noteTypes = await NoteTypeModel.find();
    return noteTypes;
}

module.exports = { showAllNoteTypes };