import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../services/EventService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input"; // later

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await EventService.login({ username, password });
      if (response.data === "Login Successful") {
        localStorage.setItem("authToken", "true");
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
            <span className="text-3xl font-bold text-white">📅</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-slate-700 dark:from-slate-100 dark:to-slate-200 bg-clip-text text-transparent mb-4">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-500 rounded-2xl text-red-700 dark:text-red-200 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg shadow-sm hover:shadow-md"
            />
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl hover:shadow-2xl" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
