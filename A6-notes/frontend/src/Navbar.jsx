import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <h2>Navbar</h2>
      <ul>
        <li>
          <Link to="/all-notes">All Notes</Link>
        </li>
        <li>
          <Link to="/add-note">Add Note</Link>
        </li>
      </ul>
    </div>
  );
}
