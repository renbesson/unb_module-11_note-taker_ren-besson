const express = require("express");
const path = require("path");

const db = require("./db/db.json");

const app = express();
const PORT = 5000;

app.use(express.static("public"));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  res.json(req.body);
  console.log(req.method);

  if (req.body) {
    console.log(req.body);
  }
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(process.env.PORT || PORT);
