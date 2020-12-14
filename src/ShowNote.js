import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import AddNote from "./AddNote";
import Note from "./Note";
import Footer from "./Footer";

function ShowNote() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const url = "api/notes";
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, []);

  return (
    <div className="Parent">
      <h1>Notes On The Go</h1>
      {user === null ? (
        <Login user={user} setUser={setUser} />
      ) : (
        <>
          <AddNote setNotes={setNotes} notes={notes} />
          <button
            onClick={() => setShowAll(!showAll)}
            className="showImpButton"
          >
            {showAll ? "Show Important Notes Only" : "Show All Notes"}
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
        </>
      )}
      <Footer />
    </div>
  );
}

export default ShowNote;
