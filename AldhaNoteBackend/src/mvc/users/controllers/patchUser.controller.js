const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { editUser } = require('../services');

const patchUser = asyncHandler(async (req, res) => {
    const { body } = req;
    const user = await editUser({ ...body });
    return res.status(201).send({ data: { user }, message: 'User edited', status: 'OK' });
});

module.exports = patchUser;
