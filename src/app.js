const path = require("path");
const geoCode = require("./utils/geoCode");
const forcast = require("./utils/foreCast");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Jamie Zirena",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jamie Zirena",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    answer:
      "You can go to the weather page by pressing the buttons above or you can learn a bit more about my self made weather application.You can also click on the other link that says 'learn to code' so you can learn to code too!",
    title: "Help",
    name: "Jamie Zirena",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  const address = req.query.address;
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: "there was an error",
      });
    }

    forcast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "there was an error",
        });
      }
      res.send({
        location: location,
        foreCast: forecastData,
        address: address,
      });
    });
  });
});
app.get("/help/*", (req, res) => {
  res.render("Shelp", {
    name: "Jamie Zirena",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    name: "Jamie Zirena",
  });
});
// app.com
//app.com/help
//app.com/about
app.listen(port, () => {
  console.log("Server is up on port 3000");
});
