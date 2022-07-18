const { createNote } = require('./createNote.service');
const { showAllNotes } = require('./showAllNotes.service');
const { showSpecificNotes } = require('./showSpecificNotes.service');
const { showOneNote } = require('./showOneNote.service');
const { editNote } = require('./editNote.service');
const { removeNote } = require('./removeNote.service');

module.exports = {
    createNote,
    editNote,
    removeNote,
    showAllNotes,
    showSpecificNotes,
    showOneNote
};
