const express = require('express');
const mongoose = require('mongoose');
const shorturlRoutes = require('./Routers/shorturl');
const logger = require('./Middleware/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/urlshortener');

app.use(express.json());
app.use(logger);
app.use('/', shorturlRoutes);

module.exports = app;
