const mongoose = require('mongoose');
const QuestionsModel = require('../../../models/Questions.model');
const { HTTP404Error } = require('../../../shared/errors/httpErrors');

const createQuestion = async ({ ...questionData }) => {
    const { question } = questionData;

    const newQuestion = new QuestionsModel({ question });
    const savedQuestion = await newQuestion.save();

    return savedQuestion;
}

module.exports = { createQuestion };
