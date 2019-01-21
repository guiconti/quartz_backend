const socketIO = require('socket.io');
let io = null;

exports.emit = (namespace, type, content) => {
  io
    .of(`/${namespace}`)
    .emit(type, content);
};

exports.initialize = server => {
  io = socketIO(server);

  io.on('connection', socket => {
    console.log('connection');
  });
};