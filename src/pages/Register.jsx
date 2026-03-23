import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../services/EventService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Register = () => {
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
      await EventService.register({ username, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-3xl font-bold text-white">✨</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-slate-700 dark:from-slate-100 dark:to-slate-200 bg-clip-text text-transparent mb-4">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Join thousands of users</p>
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
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create strong password"
            />
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl hover:shadow-2xl" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
