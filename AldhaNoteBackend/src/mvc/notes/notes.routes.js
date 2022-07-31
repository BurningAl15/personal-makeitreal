const { Router } = require('express');
const { body } = require('express-validator');

const { API_BASE_URL } = require('../../shared/utils/constants');
const {
    validationResults,
} = require('../../shared/middlewares/validationResults.middleware');

// Controllers
const {
    patchNote,
    postNote,
    deleteNote,
    getNotes,
    getSpecificNotes,
    getNote
} = require('./controllers');

const router = new Router();

router.post(
    `${API_BASE_URL}/notes`,
    body('user', 'User is required').notEmpty(),
    body('type', 'Type is required').notEmpty(),
    body('name', 'Name is required').notEmpty(),
    validationResults,
    postNote,
);

router.patch(
    `${API_BASE_URL}/notes`,
    body('user', 'User is required').notEmpty(),
    body('type', 'Type is required').notEmpty(),
    body('name', 'Name is required').notEmpty(),
    validationResults,
    patchNote,
);

router.delete(
    `${API_BASE_URL}/notes`,
    validationResults,
    deleteNote,
);

router.get(
    `${API_BASE_URL}/notes/:email`,
    validationResults,
    getNotes
);

router.get(
    `${API_BASE_URL}/notes/:email/:type`,
    validationResults,
    getSpecificNotes
);

router.get(
    `${API_BASE_URL}/note/:id`,
    validationResults,
    getNote
);

module.exports = router;
