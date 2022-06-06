const Notes = require('../models/Note');

const getAllNotes = async (req, res) => {
    try {
        // const { limit = 5, from = 0 } = req.query;
        // const userId = req.user._id;
        // const query = { user: userId };

        // // const notes = await Notes.find({});
        // const [total, user] = await Promise.all([
        //     Fav.countDocuments(query),
        //     Fav.find(query).skip(Number(from)).limit(Number(limit)),
        // ]);

        // res.status(200)
        // .json({
        //     total,
        //     user,
        // });
        // res.json({ notes });

        const notes = await Notes.find({});
        res.status(200).json({ notes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

const createNote = async (req, res) => {
    try {
        // const note = await Notes.create(req.body);
        const { type, name, content } = req.body;
        const data = {
            type,
            name,
            content,
            // user: req.user._id,
            user: "629ce38b348fa31a1aa97571",
        };
        console.log(">>> NOTE CONTENT: ", data);
        const note = new Notes(data);

        // Save on DB
        await note.save();
        res.status(201).json({ note });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Notes.findOne({ _id: id });

        if (!note) {
            return res.status(404).json({ msg: `No note with id: ${id}` });
        }

        res.status(201).json({ note });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, name, content } = req.body;
        const note = await Notes.findOneAndUpdate({ _id: id }, { type: type, name: name, content: content });

        if (!note) {
            return res.status(404).json({ msg: `No note with id: ${id}` });
        }

        res.status(201).json({ note });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Notes.findOneAndDelete({ _id: id });

        if (!note) {
            return res.status(404).json({ msg: `No note with id: ${id}` });
        }

        res.status(201).json({ note: null, status: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
    }
}

module.exports = {
    getAllNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote,
}