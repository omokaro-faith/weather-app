const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAP_BOX_SECRET}&limit=1`;

  request({ url, json: true}, (error = undefined, { body: { features } } = {}) => {
    if (error) {
      callback('Unable to connect to location services.', error);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.', error);
    } else {
      callback(error, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
}

module.exports = geocode;