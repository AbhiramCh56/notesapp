// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // We will keep the same styling as Login page

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
      setTimeout(() => navigate("/login"), 5000); // Redirect to login after 5 seconds
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Reset Password</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remembered your password? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default ResetPassword;
