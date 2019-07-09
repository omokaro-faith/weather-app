const request = require('request');

const forecast = (longitude, latitude, callback) => {
  url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET}/${latitude},${longitude}?lang=en`;

  request({ url, json: true}, ( error = undefined, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', error);
    } else if (body.error) {
      callback('Unable to find location', error);
    } else {
      const { daily, currently } = body;
      callback(error, `${daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`);
    }
  });
}

module.exports = forecast;