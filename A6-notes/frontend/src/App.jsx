import React from "react";
import Navbar from "./Navbar";
import Allnotes from "./Allnotes";
import Addnote from "./Addnote";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/all-notes" element={<Allnotes />} />
          <Route path="/add-note" element={<Addnote />} />
        </Routes>
      </Router>
    </div>
  );
}
