const express = require('express');
const path = require('path');
require('colors');
const cors = require('cors');

// Import middlewares
const {
    errorHandlerMiddleware,
} = require('./shared/middlewares/errorHandler.middleware');
const { notFound404Middleware } = require('./shared/middlewares/notFound.middleware');

// Import routes
const userRoutes = require('./mvc/users/users.routes');
const noteRoutes = require('./mvc/notes/notes.routes');
const noteTypeRoutes = require('./mvc/noteTypes/noteTypes.routes');
const questionsRoutes = require('./mvc/questions/questions.routes');

const app = express();

// Pre-routes middlewares
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use('/api/v1/', express.static(path.join(__dirname, 'static')));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(noteRoutes);
app.use(noteTypeRoutes);
app.use(questionsRoutes);

app.use(notFound404Middleware);

// Post-routes middlewares
app.use(errorHandlerMiddleware);


module.exports = app;