const { Router } = require('express');
const { body } = require('express-validator');

const { API_BASE_URL } = require('../../shared/utils/constants');
const {
    validationResults,
} = require('../../shared/middlewares/validationResults.middleware');

// Controllers
const { getNoteTypes } = require('./controllers');

const router = new Router();

router.get(
    `${API_BASE_URL}/noteTypes`,
    validationResults,
    getNoteTypes
);

module.exports = router;
