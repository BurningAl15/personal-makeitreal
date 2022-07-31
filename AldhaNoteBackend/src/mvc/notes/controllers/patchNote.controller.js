const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { editNote } = require('../services');

const patchNote = asyncHandler(async (req, res, _next) => {
    const { body } = req;
    const note = await editNote({ ...body });
    return res
        .status(201)
        .json({ data: { note }, message: 'Note edited', status: 'OK' });
});

module.exports = patchNote;