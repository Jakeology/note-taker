const { notes } = require("../../db/db");

const router = require("express").Router();

router.get("/notes", (req, res) => {
  return res.json(notes);
});

module.exports = router;
