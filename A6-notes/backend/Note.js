const mongoose = require("mongoose");

const noteshema = new mongoose.Schema({
  title: {
    type: String,
  },

  body: {
    type: String,
  },
});

const NoteTable = mongoose.model("NoteTable", noteshema);

module.exports = NoteTable;
