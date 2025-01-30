import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Collaboration from "./pages/Collaboration";
import Export from "./pages/Export";
import VersionHistory from "./pages/VersionHistory";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/collaboration" element={<Collaboration />} />
      <Route path="/export" element={<Export />} />
      <Route path="/history" element={<VersionHistory />} />
    </Routes>
  );
};

export default App;
