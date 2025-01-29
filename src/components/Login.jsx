// src/components/Login.jsx
import React, { useState } from "react";
import { auth, GoogleAuthProvider } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // Import the updated CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Handle normal login (Email/Password)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/notes"); // Redirect to the notes page after successful login
    } catch (error) {
      setError("Failed to log in. Please check your email and password.");
      console.error(error);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // Instantiate GoogleAuthProvider
    try {
      await signInWithPopup(auth, provider);
      navigate("/notes"); // Redirect to the notes page after successful login
    } catch (error) {
      setError("Failed to log in with Google.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h4>Login</h4>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
      <p>
        <a href="/reset-password">Forgot password?</a>
      </p>

      {/* Google Login Button */}
      <div className="google-btn" onClick={handleGoogleLogin}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
          alt="Google"
        />
        Login with Google
      </div>
    </div>
  );
};

export default Login;
