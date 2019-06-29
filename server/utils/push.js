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

module.exports = (pushSubscription, payload) => {
  return new Promise((resolve, reject) => {
    push.sendNotification(pushSubscription, JSON.stringify(payload), options);
  });
};