import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom"; // Import Link

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/signup", { email, password });
      alert("Signup successful! Please login.");
      navigate("/login"); 
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
