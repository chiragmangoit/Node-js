const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added sucessfully"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataStringify = dataBuffer.toString();
    return JSON.parse(dataStringify);
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync("notes.json", data);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const resultNote = notes.filter((note) => note.title !== title);
  if (resultNote.length < notes.length) {
    console.log(chalk.green.inverse("note removed"));
    saveNotes(resultNote);
  } else {
    console.log(chalk.red.inverse("no note found"));
  }
};

const listNotes = () => {
  console.log(chalk.yellow.inverse("Listing Notes"));
  const notes = loadNotes();
  notes.forEach((element) => {
    console.log(element.title);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const findResult = notes.find((note) => note.title == title);
  if (findResult) {
    console.log(chalk.white.inverse(findResult.title));
    console.log(findResult.body);
  } else {
    console.log(chalk.red.inverse("no note found"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
