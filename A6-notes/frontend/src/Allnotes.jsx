import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Allnotes() {
  const [notes, setNotes] = useState([]);
  // babu fetch data from backend data notes state variable
  // sernotes marchachu setnotes
  console.log(notes);
  const deletekaro = (id) => {
    const response = backend(delete id);
  };

  useEffect(() => {
    const fetchnotes = async () => {
      const response = await axios.get("http://localhost:5000/all-notes");
      // console.log(response.data);
      console.log(response);
      setNotes(response.data);
    };
    fetchnotes();
  }, [notes]);

  return (
    <div>
      <h2>All notes</h2>
      {notes.map((note) => {
        return (
          <div
            key={note._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button onClick={deletekaro(note._id)}>Delete</button>{" "}
          </div>
        );
      })}
    </div>
  );
}
