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
// Secret admin viewer
app.get("/admin", (req, res) => {
  const key = req.query.key;

  // Set your secret password here
  const ADMIN_KEY = "secret123";

  if (key !== ADMIN_KEY) {
    return res.status(403).send("Access Denied");
  }

  fs.readFile("coordinates.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading coordinates.");
    }

    // Show coordinates in simple HTML
    res.send(`
      <h2>Logged Coordinates</h2>
      <pre>${data}</pre>
    `);
  });
});
