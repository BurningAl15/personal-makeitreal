const bcrypt = require('bcryptjs');
const UserModel = require('../../../models/User.model');

const loginUser = async ({ ...userData }) => {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email });

    return user;
}

module.exports = loginUser;
