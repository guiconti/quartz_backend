/**
 * Module to add plays log to message chat
 * @module utils/addPlayLog
 */

const database = require('../models/database');
const io = require('./io');
const constants = require('./constants');

module.exports = (game, content) => {
  return new Promise((resolve, reject) => {
    const newMessage = new database.Messages({
      parent: game._id,
      content,
    });

    newMessage.save((err, message) => {
      if (err || !message) {
        return reject(err);
      }
      database.Messages.populate(message, 'owner', (err, message) => {
        if (err || !message) {
          return reject(err);
        }
        io.emit(game._id, constants.sockets.types.NEW_MESSAGE, message);
        return resolve();
      });
    });
  });
};
