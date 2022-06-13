const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { showAllNotes } = require('../services');

const getNotes = asyncHandler(async (req, res, _next) => {
    const { email } = req.params;
    const notes = await showAllNotes({ email });
    return res
        .status(201)
        .json({ data: { notes }, message: 'Notes from user rendered', status: 'OK' });
});

module.exports = getNotes;