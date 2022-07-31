const QuestionsModel = require('../../../models/Questions.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const showAllQuestions = async () => {
    const questions = await QuestionsModel.find();
    return questions;
}

module.exports = { showAllQuestions };