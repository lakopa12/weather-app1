const request = require("request");
const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoianoxMDk3MDUiLCJhIjoiY2wxbWhwaGZiMDExZDNjbXRya29lM3l2NSJ9.kfE4YnMb09eJz7zDqhn3ZQ&limit=1";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location. try another search !");
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geoCode;
