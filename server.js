const express = require("express");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");

var id = nanoid();

const db = require("./db/db.json");

const app = express();
const PORT = 5000;

app.use(express.static("public"));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  if (req.body) {
    let newNote = { ...req.body, id: nanoid() };
    let newDb = db;
    newDb.push(newNote);
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(newDb, null, 2),
      (error) => error && console.log(`Error adding note: ${error}`)
    );
    res.send('Note added successfully!');
  } else {
    res.send("Unable to add note.");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  if (req.params.id) {
    const id = req.params.id;

    const newDb = db.filter((note) => note.id !== id);
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(newDb, null, 2),
      (error) => error && console.log(`Error Deleting note: ${error}`)
    );
    res.status(200).send("Note deleted successfully!");
  } else {
    res.status(404).send("Unable to delete note.");
  }
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(process.env.PORT || PORT);
