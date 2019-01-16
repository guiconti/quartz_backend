module.exports = mongoose => {
  return new mongoose.Schema({
    crystals: [ mongoose.Schema.Crystals ]
  });
};
