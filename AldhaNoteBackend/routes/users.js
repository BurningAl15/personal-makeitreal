const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    updateUser
} = require('../controllers/users');

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/update').patch(updateUser);

module.exports = router;
