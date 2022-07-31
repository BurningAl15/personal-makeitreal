const postUser = require('./postUser.controller');
const postActivateUser = require('./postActivateUser.controller');
const postLoginUser = require('./postLoginUser.controller');
const patchUser = require('./patchUser.controller');
const getUser = require('./getUser.controller');

module.exports = {
    postLoginUser,
    postUser,
    postActivateUser,
    patchUser,
    getUser,
};
