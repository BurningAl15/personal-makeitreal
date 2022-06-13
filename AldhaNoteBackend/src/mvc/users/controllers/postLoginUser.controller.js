const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { loginUser } = require('../services');

const postLoginUser = asyncHandler(async (req, res) => {
    const { body } = req;
    const user = await loginUser({ ...body });
    console.log("USER POST LOGIN: ", user);
    return res.status(201).send({ data: { user }, message: 'User logged in!', status: 'OK' });
});

module.exports = postLoginUser;
