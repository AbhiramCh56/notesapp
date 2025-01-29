// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Add styling for home page

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Notes App</h1>
      <div className="home-buttons">
        <Link to="/signup">
          <button className="home-btn">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="home-btn">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
