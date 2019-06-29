module.exports = mongoose => {
  return new mongoose.Schema({
    endpoint: {
      type: String,
      unique: false,
      required: true
    },
    keys: {
      p256dh: {
        type: String,
        unique: false,
        required: false,
      },
      auth: {
        type: String,
        unique: false,
        required: false,
      }
    },
  });
};
