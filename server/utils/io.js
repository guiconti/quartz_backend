const socketIO = require('socket.io');
let io = null;

exports.instance = function () {
  return io;
};

exports.initialize = function(server) {
  io = socketIO(server);

  io.on('connection', socket => {
    console.log('connection');
  });
};