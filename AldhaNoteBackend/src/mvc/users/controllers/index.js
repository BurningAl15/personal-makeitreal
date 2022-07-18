const postUser = require('./postUser.controller');
const postActivateUser = require('./postActivateUser.controller');
const postLoginUser = require('./postLoginUser.controller');
const patchUser = require('./patchUser.controller');

module.exports = {
    postLoginUser,
    postUser,
    postActivateUser,
    patchUser,
};
