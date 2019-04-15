'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const logger = require('./logger');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(
  cors({
    origin: [`http://${process.env.CORS_ORIGIN}`, `https://${process.env.CORS_ORIGIN}`],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use('/', router);
app.use(logger.errorHandler());

let http;

const setupSSL = require('./setupSSL');
// const SSL = setupSSL();
const SSL = null;

if (SSL) {
  console.log('SSL Initialized');
  http = require('https').createServer(SSL, app);
} else {
  http = require('http').Server(app);
}

require('../server/utils/io').initialize(http);

module.exports = app;
