const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { showSpecificNotes } = require('../services');

const getSpecificNotes = asyncHandler(async (req, res, _next) => {
    const { email, type } = req.params;
    const notes = await showSpecificNotes({ email, type });
    return res
        .status(201)
        .json({ data: { notes }, message: 'Notes from user rendered', status: 'OK' });
});

module.exports = getSpecificNotes;