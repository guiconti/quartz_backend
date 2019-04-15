'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const morgan = require('morgan');
const logger = require('./logger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(
  cors({
    origin: [`http://${process.env.FRONTEND_HOST}`, `https://${process.env.FRONTEND_HOST}`, 'localhost:3330', 'http://localhost:3330'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(cookieParser());
app.use('/', router);
app.use(logger.errorHandler());
app.use(morgan('tiny'));

let http;

const setupSSL = require('./setupSSL');
const SSL = setupSSL();

if (SSL) {
  console.log('SSL Initialized');
  http = require('https').createServer(SSL, app);
} else {
  http = require('http').Server(app);
}

require('../server/utils/io').initialize(http);

module.exports = http;
