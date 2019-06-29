const push = require('web-push');

const publicKey = process.env.NOTIFICATION_PUBLIC_KEY;
const privateKey = process.env.NOTIFICATION_PRIVATE_KEY;
const options = {
  vapidDetails: {
    subject: 'mailto: quartz@bendev.com',
    publicKey: publicKey,
    privateKey: privateKey,
  }
};

module.exports = (game, playerIndex, payload) => {
  return new Promise((resolve, reject) => {
    if (game.players[playerIndex].user.notificationSettings) {
      for (let i = 0; i < game.players[playerIndex].user.notificationSettings.length; i++) {
        push.sendNotification(game.players[playerIndex].user.notificationSettings[i], payload);
      }
    }
    return resolve();
  });
};