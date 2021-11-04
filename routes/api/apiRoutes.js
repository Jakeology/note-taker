const { findById, createNote, validateNote, deleteNote} = require('../../lib/notes');
const { notes } = require("../../db/db");

const { v4: uuidv4 } = require("uuid");

const router = require("express").Router();

router.get("/notes", (req, res) => {
  return res.json(notes);
});

router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = uuidv4();

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNote(req.body, notes);
    res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    deleteNote(req.params.id, notes);
    res.json(notes);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
