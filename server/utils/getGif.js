const request = require('request');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, httpResponse, body) => {
        if (err) {
          return reject(err);
        }
        try {
          let gifData = JSON.parse(body);
          return resolve(gifData.data.image_url);
        } catch(err) {
          return reject(err);
        }
      }
    );
  });
}