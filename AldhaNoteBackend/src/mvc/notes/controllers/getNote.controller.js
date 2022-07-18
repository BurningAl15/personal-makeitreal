const { asyncHandler } = require('../../../shared/middlewares/asyncHandler.middleware');
const { showOneNote } = require('../services');

const getNote = asyncHandler(async (req, res, _next) => {
    const { id } = req.params;
    console.log("ID", id)
    const note = await showOneNote({ id });
    return res
        .status(201)
        .json({ data: { notes: note }, message: 'Note is rendered', status: 'OK' });
});

module.exports = getNote;