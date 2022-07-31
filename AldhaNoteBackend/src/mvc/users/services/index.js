const createUser = require('./createUser.service');
const activateUser = require('./activateUser.service');
const loginUser = require('./loginUser.service');
const editUser = require('./editUser.service');
const showUser = require('./showUser.service');

module.exports = {
    loginUser,
    createUser,
    activateUser,
    editUser,
    showUser,
};
