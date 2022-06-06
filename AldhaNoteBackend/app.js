const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const { dbConnection } = require("./db/connect");
require('dotenv').config();
const notes = require('./routes/notes');
const users = require('./routes/users');
const noteTypes = require('./routes/noteType');

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', users);
app.use('/api/v1/notes', notes);
app.use('/api/v1/noteTypes', noteTypes);

const PORT = process.env.PORT;

const start = async () => {
    try {
        await dbConnection();
        app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
}

start();
