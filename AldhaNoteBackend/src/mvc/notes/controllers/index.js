const postNote = require('./postNote.controller');
const getNotes = require('./getNotes.controller');
const getNote = require('./getNote.controller');
const patchNote = require('./patchNote.controller');
const deleteNote = require('./deleteNote.controller');
const getSpecificNotes = require('./getSpecificNotes.controller');

module.exports = {
    postNote,
    patchNote,
    deleteNote,
    getNotes,
    getSpecificNotes,
    getNote
};
