import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config"; // Firebase auth import
import Signup from "./components/Signup";
import Notes from "./components/Notes"; // Import Notes component
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state based on authentication
    });
    return () => unsubscribe(); // Clean up on unmount
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/notes" /> : <Home />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/notes" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/notes" /> : <Signup />}
      />
      <Route
        path="/notes"
        element={user ? <Notes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
