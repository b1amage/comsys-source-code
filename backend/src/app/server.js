// Declare library and constant
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const asyncRequest = require("async-request");
const app = express();
// Allow crossite
app.use(
  cors({
    origin: "*",
  })
);

// Get the weather json from api
const getWeather = async (location) => {
  const key = "3875523f93b7a5027b9da3a5cf69f433";
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;

  try {
    const res = await asyncRequest(url);
    const data = JSON.parse(res.body);

    // Create object
    const weather = {
      isSuccess: true,
      region: data.location.region,
      country: data.location.country,
      temperature: data.current.temperature,
      windSpeed: data.current.wind_speed,
      precip: data.current.precip,
      cloudCover: data.current.cloudcover,
      humidity: data.current.humidity,
      pressure: data.current.pressure,
    };

    return weather;
  } catch (err) {
    return {
      isSuccess: false,
      error: err,
    };
  }
};

// Call weather stack API
app.get("/:location", async (req, res) => {
  const { location } = req.params;

  // Return the weather to client side
  const weather = await getWeather(location);

  // Check if the call is success
  if (weather.isSuccess) {
    res.status(200).send(weather);
  } else {
    res.status(404).send(weather);
  }
});

// Sending pi command
app.get("/pi/:command", async (req, res) => {
  const { command } = req.params;
  console.log(command);

  // Write the command to file
  fs.writeFileSync(
    "app/command.json",
    JSON.stringify({ isSuccess: true, command })
  );

  res.status(200).send({ isSuccess: true, status: "Request sent to pi!" });
});

// Get command from command.json send to pi
app.get("/", async (req, res) => {
  try {
    // Read the file to send command
    const command = await fs.readFileSync("app/command.json", "utf8");
    res.send(command);

    // Delete used command
    fs.writeFileSync("app/command.json", JSON.stringify(""));
  } catch (err) {
    res.send(err);
  }
});

// Get data from pi (pi write data to file)
app.get("/pi/req/:temperature/:humidity/:pressure", async (req, res) => {
  const { temperature, humidity, pressure } = req.params;

  // Write to the file 3 features
  fs.writeFileSync(
    "app/pi.json",
    JSON.stringify({ temperature, humidity, pressure })
  );

  res.status(200).send("Updated file");
});

app.get("/write/chart/:temperature/:humidity/:pressure", async (req, res) => {
  const { temperature, humidity, pressure } = req.params;
  const chart = await fs.readFileSync("app/chart.json", "utf8");
  let chartList = JSON.parse(chart);
  const timestamp = new Date();
  const date = `${timestamp.getDate()}/${
    timestamp.getMonth() + 1
  }/${timestamp.getFullYear()}`;
  if (chartList.length == 0 || !chartList) {
    fs.writeFileSync(
      "app/chart.json",
      JSON.stringify([{ temp: temperature, humid: humidity, pressure, date }])
    );
  } else {
    chartList = [
      ...chartList,
      { temp: temperature, humid: humidity, pressure, date },
    ];
    if (chartList.length > 4) {
      chartList.shift();
    }
    fs.writeFileSync("app/chart.json", JSON.stringify(chartList));
  }

  res.status(200).send("File updated");
});

// Send pi data to front end
app.get("/pi/data/measure", async (req, res) => {
  try {
    // Get the data of the pi
    const piData = await fs.readFileSync("app/pi.json", "utf8");
    res.send(piData);

    // Delete used data
    fs.writeFileSync("app/pi.json", JSON.stringify(""));
  } catch (err) {
    res.send(err);
  }
});

app.get("/pi/get/chart/:command", async (req, res) => {
  const { command } = req.params;
  const chart = await fs.readFileSync("app/chart.json", "utf8");
  let chartList = JSON.parse(chart);
  let commandArray = [];
  chartList.forEach((chart) => {
    commandArray = [
      ...commandArray,
      {
        data: chart.date,
        [command]: parseFloat(chart[command]),
      },
    ];
  });

  res.status(200).send(commandArray);
});

// Listen at port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
