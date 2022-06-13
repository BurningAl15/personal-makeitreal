const express = require('express');
const router = express.Router();
const {
    getNoteTypes,
    postNoteTypes,
    putNoteTypes,
    deleteNoteTypes
} = require('../controllers/noteType');

router.route('/').get(getNoteTypes).post(postNoteTypes).put(putNoteTypes).delete(deleteNoteTypes);

module.exports = router;
