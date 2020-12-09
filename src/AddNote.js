import React, { useState } from "react";
import axios from "axios";

function AddNote(props) {
  const url = "/api/notes";
  const [newNote, setNote] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };
    axios.post(url, noteObject).then((response) => {
      props.setNotes(props.notes.concat(response.data));
      setNote("");
    });
  };
  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label>
          Add Note:
          <input
            type="text"
            name="name"
            placeholder="Add New Note"
            value={newNote}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <input type="submit" value="Add" className="inputSubmit" />
      </form>
    </div>
  );
}

export default AddNote;
