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

app.use(
  cors({
    origin: [`http://${process.env.FRONTEND_HOST}`, `https://${process.env.FRONTEND_HOST}`, '.tiimus.com', 'tiimus.com', `${process.env.FRONTEND_HOST}`],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);
app.use(cookieParser());
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

module.exports = http;
