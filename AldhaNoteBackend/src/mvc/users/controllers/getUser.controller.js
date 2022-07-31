const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { showUser } = require('../services');

const getUser = asyncHandler(async (req, res) => {
    // const { body } = req;
    const { id } = req.params;
    const user = await showUser({ id });
    return res.status(201).send({ data: { user }, message: 'User showed', status: 'OK' });
});

module.exports = getUser;