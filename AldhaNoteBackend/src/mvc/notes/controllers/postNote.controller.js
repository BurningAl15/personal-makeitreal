const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { createNote } = require('../services');

const postNote = asyncHandler(async (req, res, _next) => {
    const { body } = req;
    const note = await createNote({ ...body });
    return res
        .status(201)
        .json({ data: { note }, message: 'Note created', status: 'OK' });
});

module.exports = postNote;
