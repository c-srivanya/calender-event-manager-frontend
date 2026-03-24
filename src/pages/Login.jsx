import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventService from "../services/EventService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Sparkles, User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // GenZ floating particles
    const interval = setInterval(() => {
      setParticles(prev => [...prev.slice(-19), {
        id: Date.now(),
        x: Math.random() * 100,
        y: 100,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 0.5 + 0.2
      }]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-pastel-50 via-indigo-50 to-purple-50 dark:from-slate-900/95 dark:via-blue-950/20 dark:to-slate-900/95 p-8 flex items-center justify-center">
      {/* Floating GenZ particles */}
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute bg-gradient-to-r from-blue-pastel-400 to-purple-400 rounded-full shadow-glow-blue opacity-60 animate-pulse"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.y}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `translateY(${particle.y * -1}px)`
          }}
        />
      ))}

      {/* Main asymmetric card */}
      <div className="relative w-full max-w-lg lg:max-w-2xl group">
        {/* Floating badge */}
        <div className="absolute -top-16 -right-12 w-32 h-32 bg-gradient-to-br from-primary/20 to-blue-pastel-500/30 rounded-3xl blur-xl group-hover:scale-110 transition-all duration-700 opacity-70"></div>
        
        <div className="glass backdrop-blur-3xl rounded-3xl lg:rounded-[3rem] p-10 lg:p-14 border border-glass-border/50 shadow-genz-3d hover:shadow-glow-blue group-hover:-translate-y-4 transition-all duration-700 relative overflow-hidden">
          {/* Kinetic top gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-blue-pastel-400/10 -skew-y-3 -rotate-1 -translate-x-8 scale-110 animate-pulse-soft"></div>
          
          <div className="text-center relative z-10 mb-14 lg:mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-pastel-500 text-white px-6 py-3 rounded-2xl shadow-glow-blue mb-6 font-extrabold text-lg tracking-wider animate-slideUp">
              <Sparkles size={20} />
              Welcome back ✨
            </div>
            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-primary to-blue-pastel-600 bg-clip-text text-transparent drop-shadow-genz mb-4 leading-tight animate-fadeIn">
              Sign In
            </h1>
            <p className="text-xl text-text/70 font-medium max-w-md mx-auto leading-relaxed">Enter your details to access your personalized calendar dashboard</p>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/30 rounded-3xl text-red-600 backdrop-blur-xl shadow-genz-soft animate-slideUp text-center font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50 group-focus-within:text-primary transition-colors" size={22} />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Your username"
                className="pl-12 pr-4 font-semibold group-hover:shadow-genz-soft focus:shadow-glow-blue"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50 group-focus-within:text-primary transition-colors" size={22} />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="pl-12 pr-4 font-semibold group-hover:shadow-genz-soft focus:shadow-glow-blue"
              />
            </div>

            <Button type="submit" className="w-full h-16 text-xl font-black shadow-genz-3d hover:shadow-glow-blue group-hover:scale-[1.02] bg-gradient-to-r from-primary via-blue-pastel-500 to-purple-500 glassPulse" disabled={loading}>
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Signing you in...
                </>
              ) : (
                "🚀 Access Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-12 pt-10 border-t border-glass-border/50 text-center">
            <p className="text-lg text-text/60">
              New here?{' '}
              <Link to="/register" className="font-black text-primary hover:text-blue-pastel-600 underline underline-offset-4 transition-all duration-300 hover:underline-offset-8">
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom floating element */}
        <div className="absolute -bottom-20 -left-16 w-32 h-32 bg-gradient-to-tr from-blue-pastel-400/30 to-transparent rounded-full blur-xl group-hover:rotate-12 transition-all duration-700 opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;

