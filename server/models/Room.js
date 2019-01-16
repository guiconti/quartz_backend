const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Player = require('./Player');

const RoomSchema = new Schema({
  name: { type: String, required: true, default: '' },
  players: [ Player ]
});

mongoose.model('Rooms', RoomSchema);
