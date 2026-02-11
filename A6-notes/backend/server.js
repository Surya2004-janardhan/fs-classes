const express = require("express");
const connectToMongodb = require("./mongodb");
const app = express();
const cors = require("cors");
app.use(express.json());
connectToMongodb();
// app = server
const NoteTable = require("./Note");
app.use(cors());

const port = 5000;

app.post("/add-note", async (req, res) => {
  const { title, body } = req.body;

  const newnote = new NoteTable({ title, body });
  await newnote.save();
  res.status(201).json({ message: "successfully created a new note" });
});

app.get("/all-notes", async (req, res) => {
  const allnotes = await NoteTable.find();
  //   findone - one item reutnr based on inside q
  //  find - multi based on   q , all usersr

  res.json(allnotes);
});

app.listen(port, () => {
  console.log("server running on this port ");
});
