import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../services/EventService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);

    try {
      const response = await EventService.login({ username, password });
      const result = response.data;

      if (result === "Login Successful") {
        localStorage.setItem("authToken", "true");
        navigate("/dashboard");
        return;
      }

      setError("Invalid username or password.");
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="auth-form">
        <h1>Welcome back</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;