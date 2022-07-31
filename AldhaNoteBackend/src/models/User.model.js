const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
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
        validate: {
            validator: async function (email) {
                const user = await this.constructor.findOne({ email });
                if (user) {
                    if (this.id === user.id) {
                        return true;
                    }

                    return false;
                }
                return true;
            },
            message: 'The specified email address is already in use.',
        },
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
        required: [true, 'User email required.'],
        unique: true,
    },
    password: { type: String, required: true, minlength: 6 },
    isActive: { type: Boolean, default: false },
    activationToken: String,
    image: { type: String },
    imageId: { type: String },
    securityQuestion: { type: String },
    securityAnswer: { type: String },
    notes: [{ type: Types.ObjectId, ref: 'Note', required: true }],
});

module.exports = model('User', userSchema);
