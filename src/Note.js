import React, { useState } from "react";
import axios from "axios";

function Note({ note, idx, url, notes, setNotes }) {
  const [imp, setImp] = useState(note.important);
  const handleClick = () => {
    //console.log("button clicked");
    const notetemp = notes.find((n) => n.id === note.id);
    const changedNote = { ...notetemp, important: !note.important };
    axios
      .put(`${url}/${note.id}`, changedNote)
      .then((response) => {
        //console.log(response.data);
        setNotes(
          notes.map((note1) => (note1.id === note.id ? response.data : note1))
        );
        setImp(!imp);
        //console.log(notes);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    //console.log("button clicked", id);
    let r = window.confirm("Are you sure?");
    if (r) {
      const notetemp = notes.find((n) => n.id === id);
      //console.log(notetemp);
      axios
        .delete(`${url}/${id}`, notetemp)
        .then((response) => {
          //console.log(response.data);
          setNotes(notes.filter((note1) => note1.id !== id));
          //console.log(notes);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <React.Fragment>
      <h4>
        {idx + 1}. {note.content}
      </h4>
      <p>
        Date Added: {note.date.substr(11, 8)},{note.date.substr(0, 10)}
      </p>
      <button value={imp} onClick={() => handleClick()}>
        {imp ? "Important" : "Not Important"}
      </button>
      <button onClick={() => handleDelete(note.id)}>Delete</button>
    </React.Fragment>
  );
}

export default Note;
