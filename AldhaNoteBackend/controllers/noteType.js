const NoteType = require('../models/NoteType');
const { fieldValidator } = require('../middlewares/field-validator');

const getNoteTypes = async (req, res) => {
    try {
        const noteType = await NoteType.find({});
        res.status(200).json({ noteType });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

const postNoteTypes = async (req, res) => {
    fieldValidator(req, res);

    const { noteType } = req.body;
    const noteTypeContainer = new NoteType({ noteType });

    //Verify if email exists
    const noteTypeExists = await NoteType.findOne({ noteType });
    if (noteTypeExists) {
        return res.status(400).json({
            msg: 'Note Type already registered'
        })
    }

    //Save on DB
    await noteTypeContainer.save();

    res.json({
        msg: 'post Note Type - controller',
        noteTypeContainer
    });
}

const putNoteTypes = (req, res) => {
    const { id } = req.params;

    res.json({
        msg: 'put Note Type - controller',
        id
    });
}

const deleteNoteTypes = (req, res) => {
    res.json({
        msg: 'delete Note Type - controller'
    });
}

module.exports = {
    getNoteTypes,
    postNoteTypes,
    putNoteTypes,
    deleteNoteTypes
}