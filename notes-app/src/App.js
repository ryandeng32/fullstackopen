import React, { useState, useEffect } from "react";

// Components import
import Note from "./components/Note";
import Notification from "./components/Notification";
// Service import
import noteService from "./services/notes";

const App = ({ saved_notes }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((res) =>
      setNotes(
        res.data.concat({
          id: 1000,
          content: "HTML is fuck",
          date: "2019-05-30T17:30:31.098Z",
          important: true,
        })
      )
    );
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    noteService.create(noteObject).then((res) => {
      setNotes(notes.concat(res.data));
      setNewNote("");
    });
  };
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((res) => {
        setNotes(notes.map((note) => (note.id !== id ? note : res.data)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
