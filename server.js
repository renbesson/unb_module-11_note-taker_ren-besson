const express = require("express");
const path = require("path");

const app = express();
const PORT = 80;

app.use(express.static("public"));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/send", (req, res) => res.sendFile(path.join(__dirname, "public/send.html")));

app.listen(process.env.PORT || 5000);
