const socketIO = require('socket.io');
let io = null;
const constants = require('./constants');

exports.emit = (namespace, type, content) => {
  io
    .to(namespace)
    .emit(type, content);
};

exports.initialize = server => {
  io = socketIO(server);

  io.on(constants.sockets.types.CONNECT, socket => {
    socket.on(constants.sockets.types.JOIN_ROOM, roomId => {
      socket.join(roomId);
    });
    socket.on(constants.sockets.types.LEAVE_ROOM, roomId => {
      socket.leave(roomId);
    });
    socket.on(constants.sockets.types.JOIN_GAME, gameId => {
      socket.join(gameId);
    });
    socket.on(constants.sockets.types.LEAVE_GAME, gameId => {
      socket.leave(gameId);
    });
    socket.on(constants.sockets.types.JOIN_PLAYER_ROOM, playerId => {
      socket.join(playerId);
    });
    socket.on(constants.sockets.types.LEAVE_PLAYER_ROOM, playerId => {
      socket.leave(playerId);
    });
  });
};