import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      console.log("Sending login request:", { email, password });
      const response = await api.post("/api/auth/login", { email, password });
      console.log("Login response:", response.data);


      alert("Login successful!");
      navigate("/api/v1"); 
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.message || "An unexpected error occurred";
      alert("Login failed: " + errorMessage);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
