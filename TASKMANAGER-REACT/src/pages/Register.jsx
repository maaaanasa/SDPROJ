import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:2030/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("✅ User registered successfully");
      navigate("/login"); // Go to login page after registration
    } else {
      alert("❌ Registration failed");
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

        .register-fullscreen {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
        }

        .register-container {
          max-width: 400px;
          width: 90%;
          padding: 20px;
          border-radius: 8px;
          background: #fafafa;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .register-title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .register-form {
          display: flex;
          flex-direction: column;
        }

        .register-label {
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .register-input {
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .register-button {
          padding: 10px;
          background: #2196f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .register-button:hover {
          background: #1976d2;
        }
      `}</style>

      <div className="register-fullscreen">
        <div className="register-container">
          <h2 className="register-title">Register</h2>
          <form onSubmit={handleRegister} className="register-form">
            <label className="register-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="register-input"
              required
            />

            <label className="register-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="register-input"
              required
            />

            <label className="register-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="register-input"
              required
            />

            <button type="submit" className="register-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
