const express = require('express');
const path = require('path');
require('colors');

// Import middlewares
const {
    errorHandlerMiddleware,
} = require('./shared/middlewares/errorHandler.middleware');
const { notFound404Middleware } = require('./shared/middlewares/notFound.middleware');

// Import routes
const userRoutes = require('./mvc/users/users.routes');
const noteRoutes = require('./mvc/notes/notes.routes');
// const shopRoutes = require('./shop/shop.routes');

const app = express();

// Pre-routes middlewares
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use('/api/v1/', express.static(path.join(__dirname, 'static')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(noteRoutes);
// app.use(shopRoutes);

app.use(notFound404Middleware);

// Post-routes middlewares
app.use(errorHandlerMiddleware);


module.exports = app;