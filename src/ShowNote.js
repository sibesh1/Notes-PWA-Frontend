import React, { useState, useEffect } from "react";
import axios from "axios";
import AddNote from "./AddNote";
import Note from "./Note";
import Footer from "./Footer";

function ShowNote() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const url = "/api/notes";
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, []);

  return (
    <div className="Parent">
      <AddNote setNotes={setNotes} notes={notes} />
      <button onClick={() => setShowAll(!showAll)} className="showImpButton">
        {showAll ? "Show Important" : "Show All"}
      </button>
      <div className="Note">
        {showAll
          ? notes.map((note, idx) => (
              <Note
                note={note}
                idx={idx}
                url={url}
                notes={notes}
                setNotes={setNotes}
                key={note.id}
              />
            ))
          : notes
              .filter((note) => note.important)
              .map((note, idx) => (
                <Note
                  note={note}
                  idx={idx}
                  url={url}
                  notes={notes}
                  setNotes={setNotes}
                  key={note.id}
                />
              ))}
      </div>
      <Footer />
    </div>
  );
}

export default ShowNote;