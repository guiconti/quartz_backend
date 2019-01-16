const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Crystal = require('./Crystal');

const CaveSchema = new Schema({
  crystals: [ Crystal ]
});

mongoose.model('Cave', CaveSchema);
