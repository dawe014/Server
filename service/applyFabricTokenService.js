const request = require("request");
const config = require("../config/config");

function applyFabricToken() {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      url: config.baseUrl + "/payment/v1/token",
      headers: {
        "Content-Type": "application/json",
        "X-APP-Key": config.fabricAppId,
      },
      rejectUnauthorized: false,
      requestCert: false,
      agent: false,
      body: JSON.stringify({
        appSecret: config.appSecret,
      }),
    };

    request(options, function (error, response, body) {
      if (error) {
        return reject(new Error(`Request failed: ${error.message}`));
      }

      try {
        const result = JSON.parse(body);
        resolve(result);
      } catch (parseError) {
        reject(new Error(`Failed to parse response: ${parseError.message}`));
      }
    });
  });
}

module.exports = applyFabricToken;
