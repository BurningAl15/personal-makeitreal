const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const UserModel = require('../../../models/User.model');
// const emailService = require('../../shared/services/email.service');
const { cloudinary, UPLOAD_PRESET } = require('../../../config/cloudinary')

const editUser = async ({ ...userData }) => {
    const { firstName, lastName, email, password, image, securityQuestion, securityAnswer } = userData;

    const foundUser = await UserModel.findOne({ email: email });
    let cloudinaryImage = await cloudinary.uploader.upload(image, { upload_preset: UPLOAD_PRESET });
    const tempUser = {
        _id: foundUser._id,
        firstName: firstName !== foundUser.firstName ? firstName : foundUser.firstName,
        lastName: lastName !== foundUser.lastName ? lastName : foundUser.lastName,
        email: email !== foundUser.email ? email : foundUser.email,
        password: foundUser.password,
        isActive: foundUser.isActive,
        activationToken: foundUser.activationToken,
        image: cloudinaryImage.url,
        imageId: cloudinaryImage.public_id,
        securityQuestion: foundUser.securityQuestion,
        securityAnswer: foundUser.securityAnswer,
    };
    const modifiedUser = await UserModel.findByIdAndUpdate(tempUser._id, tempUser, { new: true });

    // const hashedPassword = await hashPassword(password);

    return modifiedUser;
};

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
};

module.exports = editUser;
