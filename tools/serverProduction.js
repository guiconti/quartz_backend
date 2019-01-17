'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const logger = require('./logger');
const app = express();
const http = require('http').Server(app);
require('../server/utils/io').initialize(http);
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use('/', router);
app.use(logger.errorHandler());

module.exports = http;
