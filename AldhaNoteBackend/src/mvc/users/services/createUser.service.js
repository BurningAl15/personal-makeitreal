const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const UserModel = require('../../../models/User.model');
// const emailService = require('../../shared/services/email.service');
const { cloudinary, UPLOAD_PRESET } = require('../../../config/cloudinary')

const createUser = async ({ ...userData }) => {
    const { firstName, lastName, email, password, image, securityQuestion, securityAnswer } = userData;
    const hashedPassword = await hashPassword(password);
    const activationToken = generateToken(16);
    let cloudinaryImage = await cloudinary.uploader.upload(image, { upload_preset: UPLOAD_PRESET });

    const user = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isActive: false,
        activationToken,
        image: cloudinaryImage.url,
        imageId: cloudinaryImage.public_id,
        securityQuestion,
        securityAnswer
    });

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        await user.save({ session });
        // await emailService.sendAccountActivationEmail(email, activationToken);
    });
    await session.endSession();

    return user;
};

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
};

function generateToken(length) {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
}

module.exports = createUser;
