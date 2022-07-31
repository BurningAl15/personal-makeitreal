const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { createQuestion } = require('../services');

const postQuestion = asyncHandler(async (req, res, _next) => {
    const { body } = req;
    console.log("Create Question Body: ", body);
    const question = await createQuestion({ ...body });
    return res
        .status(201)
        .json({ data: { question }, message: 'Question created', status: 'OK' });
});

module.exports = postQuestion;