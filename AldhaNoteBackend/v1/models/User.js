const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'must provide a firstName'],
        minlength: [2, 'firstName can not be less than 2 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'must provide a lastName'],
        minlength: [2, 'lastName can not be less than 2 characters'],
    },
    email: {
        type: String,
        required: [true, 'must provide an email'],
        trim: true,
        minlength: [2, 'email can not be less than 2 characters'],
    },
    password: {
        type: String,
        required: [true, 'must provide a password'],
        trim: true,
        minlength: [7, 'password can not be less than 2 characters'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'must provide a password'],
        trim: true,
        minlength: [7, 'password can not be less than 2 characters'],
    },
});

module.exports = mongoose.model('User', UserSchema);