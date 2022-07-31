const bcrypt = require('bcryptjs');
const UserModel = require('../../../models/User.model');

const showUser = async ({ ...userData }) => {
    const { id } = userData;
    const user = await UserModel.findById(id);

    return user;
}

module.exports = showUser;
