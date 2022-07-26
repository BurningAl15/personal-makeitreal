const { Router } = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');

// Controllers
const { postUser, postActivateUser, postLoginUser, patchUser, getUser } = require('./controllers');

// Models
const User = require('../../models/User.model');

// Middlewares
const {
    validationResults,
} = require('../../shared/middlewares/validationResults.middleware');

const { API_BASE_URL } = require('../../shared/utils/constants');

const router = Router();

router.post(
    `${API_BASE_URL}/register`,
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .bail()
        .isEmail()
        .withMessage('Email is not valid')
        .bail()
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('Email in use');
            }
        }),
    body('password').notEmpty().withMessage('Password cannot be empty'),
    validationResults,
    postUser,
);

router.patch(
    `${API_BASE_URL}/edit`,
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .bail()
        .isEmail()
        .withMessage('Email is not valid'),
    validationResults,
    patchUser,
);

router.post(`${API_BASE_URL}/login/:token`, postActivateUser);

let user = null;

router.post(`${API_BASE_URL}/login`,
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .bail()
        .isEmail()
        .withMessage('Email is not valid')
        .bail()
        .custom(async (email) => {
            user = await User.findOne({ email });
            if (user === null) {
                throw new Error('User/Password are not correct');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .bail()
        .custom(async (password) => {
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw new Error("Usuario/Password no son correctos - password");
            }
        }),
    validationResults,
    postLoginUser);

router.get(`${API_BASE_URL}/userData/:id`,
    getUser);

module.exports = router;
