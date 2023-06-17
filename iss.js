const request = require('request');

const fetchMyIP = function(callback) { //API Call #1
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) { //API Call #2
  request(`https://ipwhois.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.success) {
      const errorMsg = `Invalid IP address: ${data.message}`;
      callback(new Error(errorMsg), null);
      return;
    }

    const { latitude, longitude } = data;
    const coordinates = { latitude, longitude };
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) { //API Call #3
  const url = `https://iss-flyover.herokuapp.com/json/?lat=49.2827291&lon=-123.1207375`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };