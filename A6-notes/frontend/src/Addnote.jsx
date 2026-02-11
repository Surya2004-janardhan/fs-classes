import React from "react";
import axios from "axios";
import { useState } from "react";
export default function Addnote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlechangetitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const handlechangebody = (e) => {
    setBody(e.target.value);
  };

  const surya = () => {
    console.log("babu clicked");
    const response = axios.post("http://localhost:5000/add-note", {
      title,
      body,
    });

    console.log(response);

    
    setTitle("");
    setBody("");

  };

  return (
    <div>
      Addnote
      <label htmlFor="">Title : </label>
      <input type="text" value={title} onChange={handlechangetitle} />
      <label htmlFor="">Body</label>
      <input type="text" value={body} onChange={handlechangebody} />
      <button onClick={surya}>Submit</button>
    </div>
  );
}
