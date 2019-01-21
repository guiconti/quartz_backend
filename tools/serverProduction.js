'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const logger = require('./logger');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
require('../server/utils/io').initialize(http);
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3339'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use('/', router);
app.use(logger.errorHandler());

module.exports = http;
