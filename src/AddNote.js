import React, { useState } from "react";
import axios from "axios";

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export function AddNote(props) {
  const url = "http://localhost:3000/api/notes";
  const [newNote, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };
    const config = {
      headers: { Authorization: token },
    };
    axios.post(url, noteObject, config).then((response) => {
      props.setNotes(props.notes.concat(response.data));
      setNote("");
    });
  };
  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Add New Note</strong>
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
