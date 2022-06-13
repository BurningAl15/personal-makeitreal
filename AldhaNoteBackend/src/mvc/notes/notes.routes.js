const { Router } = require('express');
const { body } = require('express-validator');

const { API_BASE_URL } = require('../../shared/utils/constants');
const {
    validationResults,
} = require('../../shared/middlewares/validationResults.middleware');

// Controllers
const { postNote, getNotes } = require('./controllers');

const router = new Router();

router.post(
    `${API_BASE_URL}/notes`,
    body('user', 'User is required').notEmpty(),
    body('type', 'Type is required').notEmpty(),
    body('name', 'Name is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
    validationResults,
    postNote,
);

router.get(
    `${API_BASE_URL}/notes/:email`,
    validationResults,
    getNotes
);

module.exports = router;
