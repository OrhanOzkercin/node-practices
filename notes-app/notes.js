const fs = require('fs');
const chalk = require('chalk');

const getNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  console.log(note);
  if (note) return note;
  else console.log(chalk.red.inverse(`${title} is not in list`));
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.blue.inverse(note.title, note.body));
  });
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const hasTitle = notes.indexOf(title);
  debugger;
  if (hasTitle !== -1) {
    console.log(chalk.red('Title taken'));
    return;
  }
  notes.push({
    title,
    body,
  });
  console.log(chalk.blue(`${title} added`));
  saveNotes(notes);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const updatedNotes = notes.filter((note) => note.title !== title);
  if (notes.length === updatedNotes.length) console.log(chalk.red('There is no note with this title'));
  else console.log(chalk.green(`${title} removed`));

  saveNotes(updatedNotes);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNote,
  addNote,
  removeNote,
  listNotes,
};
