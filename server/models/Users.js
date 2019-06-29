module.exports = mongoose => {
  return new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String
    },
    notificationSettings: [ mongoose.Schema.NotificationSettings ]
  });
};
