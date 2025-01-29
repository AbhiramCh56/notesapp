// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ResetPassword from "./components/ResetPassword";
import Notes from "./components/Notes"; // Import ResetPassword

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/notes" element={<Notes />} /> {/* Add Notes route */}
      </Routes>
    </Router>
  </AuthProvider>
);
