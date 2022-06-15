const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { showAllNoteTypes } = require('../services');

const getNoteTypes = asyncHandler(async (req, res, _next) => {
    const noteTypes = await showAllNoteTypes();
    return res
        .status(201)
        .json({ data: { noteTypes }, message: 'Notes from user rendered', status: 'OK' });
})

module.exports = getNoteTypes;
