import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import { WebSocketProvider } from "./contexts/WebSocketContext";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editor/:collageId"
        element={
          <ProtectedRoute>
            <WebSocketProvider
              url="ws://localhost:9000"
            >
              <Editor />
            </WebSocketProvider>
          </ProtectedRoute>
        }
      />
      {/* <Route path="/collaboration" element={<Collaboration />} />
      <Route path="/export" element={<Export />} />
      <Route path="/history" element={<VersionHistory />} /> */}
    </Routes>
  );
};

export default App;
