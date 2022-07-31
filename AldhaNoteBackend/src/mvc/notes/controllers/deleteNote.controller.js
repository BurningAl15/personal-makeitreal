const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { removeNote } = require('../services');

const deleteNote = asyncHandler(async (req, res, _next) => {
    const { body } = req;
    const note = await removeNote({ ...body });
    return res
        .status(201)
        .json({ data: { note }, message: 'Note deleted', status: 'OK' });
});

module.exports = deleteNote;