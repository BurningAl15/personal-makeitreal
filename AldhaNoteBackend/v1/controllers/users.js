const bcryptjs = require("bcryptjs");
const User = require('../models/User');
const { generateJWT } = require("../helpers/generate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/field-validator");
const { isValidEmail } = require("../helpers/db-validators");


const registerUser = async (req, res) => {

    check("email", "Email field is required").isEmail();
    check("email").custom(isValidEmail);
    check("password", "Password field is required").not().isEmpty();
    validateFields(req, res);

    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const user = new User({ firstName, lastName, email, password, confirmPassword });

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // Save in BD
        await user.save();

        // const user = await User.create(req.body);
        res.status(201).json({
            msg: "Congrats, your user is successfully created!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

const loginUser = async (req, res) => {
    check("email", "Email field is required").isEmail();
    check("password", "Password field is required").not().isEmpty();
    validateFields(req, res);

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {
            return res.status(400).json({
                msg: 'User/Password are not correct'
            });
        }

        //Check if password is valid
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario/Password no son correctos - password",
            });
        }

        // Generate the JWT
        const token = await generateJWT(user.id);
        //Change this line
        req.user = user;

        res.json({
            user,
            token,
            msg: "Successfully Logged in!",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const task = await Task.findOneAndUpdate({ _id: id }, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        });

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${id}` });
        }

        res.status(201).json({ task });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser
}