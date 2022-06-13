const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email cannot be empty',
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = userSchema;