const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { showAllQuestions } = require('../services');

const getQuestions = asyncHandler(async (req, res, _next) => {
    const questions = await showAllQuestions();
    return res
        .status(201)
        .json({ data: { questions }, message: 'Questions rendered', status: 'OK' });
})

module.exports = getQuestions;
