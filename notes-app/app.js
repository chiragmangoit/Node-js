const yargs = require("yargs");
const notes = require("./notes.js");

//add command
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
        describe: "Note Title",
        demandOption: true,
        type: "string",
      }
  },
  handler: function (argv) {
   notes.removeNote(argv.title)
  },
});

//list command
yargs.command({
  command: "list",
  describe: "list notes",
  handler: function () {
   notes.listNotes()
  },
});

//read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
        describe: "Note Title",
        demandOption: true,
        type: "string",
      }
  },
  handler: function (argv) {
    notes.readNotes(argv.title)
  },
});

console.log(yargs.argv);
