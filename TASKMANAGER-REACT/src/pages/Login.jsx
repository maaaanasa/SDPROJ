import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:2030/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.text();

    if (result === "Login successful") {
      alert("✅ Login successful");
      navigate("/dashboard");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #1e1e1e;
        }

        .login-fullscreen {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
        }

        .login-container {
          max-width: 400px;
          width: 90%;
          padding: 20px;
          border-radius: 8px;
          background: #fafafa;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .login-title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .login-label {
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .login-input {
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .login-button {
          padding: 10px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .login-button:hover {
          background: #45a049;
        }
      `}</style>

      <div className="login-fullscreen">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <label className="login-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="login-input"
              required
            />

            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="login-input"
              required
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
