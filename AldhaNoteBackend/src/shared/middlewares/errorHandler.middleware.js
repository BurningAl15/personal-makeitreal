const { Result } = require('express-validator');
const { APIError } = require('../errors/httpErrors');

const errorHandlerMiddleware = (error, req, res, next) => {
    const apiError = new APIError();

    if (res.headerSent) {
        return next(error);
    }

    // Express-validator errors array
    if (error instanceof Result) {
        const { validationErrors } = error;
        return res.status(400).send({ error: { validationErrors } });
    }

    /* return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'An unknown error ocurred' }); */

    res.status(error.statusCode || apiError.statusCode).json({
        error: error.message || apiError.message,
        status: 'ERROR',
    });
};

module.exports = { errorHandlerMiddleware };