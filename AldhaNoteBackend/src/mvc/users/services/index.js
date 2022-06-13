const createUser = require('./createUser.service');
const activateUser = require('./activateUser.service');
const loginUser = require('./loginUser.service');

module.exports = {
    loginUser,
    createUser,
    activateUser,
};
