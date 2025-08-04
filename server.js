const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/coordinates", (req, res) => {
  const { latitude, longitude } = req.body;
  const log = `${new Date().toISOString()} - Lat: ${latitude}, Lon: ${longitude}\n`;

  fs.appendFile("coordinates.txt", log, (err) => {
    if (err) {
      console.error("Error saving coordinates:", err);
      return res.status(500).send("Failed to save.");
    }
    res.status(200).send("Coordinates saved.");
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
