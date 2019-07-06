const request = require('request');

const forecast = (longitude, latitude, callback) => {
  url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET}/${longitude},${latitude}?lang=en`;

  request({ url, json: true}, ( error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`, undefined);
    }
  });
}

module.exports = forecast;