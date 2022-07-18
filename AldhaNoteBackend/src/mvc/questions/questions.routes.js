const { Router } = require('express');
const { body } = require('express-validator');

const { API_BASE_URL } = require('../../shared/utils/constants');
const {
    validationResults,
} = require('../../shared/middlewares/validationResults.middleware');

// Controllers
const {
    getQuestions,
    postQuestion
} = require('./controllers');

const router = new Router();

router.get(
    `${API_BASE_URL}/questions`,
    validationResults,
    getQuestions
);

router.post(
    `${API_BASE_URL}/questions`,
    validationResults,
    postQuestion
)

module.exports = router;
