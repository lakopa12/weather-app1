const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url2 =
    "http://api.weatherstack.com/current?access_key=451db464c7210634d1c51a592228b5a2";
  const url =
    "http://api.weatherstack.com/current?access_key=69ce258c6931d95372cff1c3d41bdca6&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable able to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out." +
          "wind speed is " +
          body.current.wind_speed +
          " an hour and humidity is %" +
          body.current.humidity +
          "."
      );
    }
  });
};

module.exports = forecast;
