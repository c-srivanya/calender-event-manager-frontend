import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventService from "../services/EventService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Sparkles, User, Lock, Mail } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Floating GenZ particles
    const interval = setInterval(() => {
      setParticles(prev => [...prev.slice(-19), {
        id: Date.now(),
        x: Math.random() * 100,
        y: 100,
        size: Math.random() * 10 + 6,
        speed: Math.random() * 0.4 + 0.1
      }]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await EventService.register({ username, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Username might be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-slate-900/95 dark:via-purple-950/20 dark:to-slate-900/95 p-8 flex items-center justify-center">
      {/* GenZ colorful particles */}
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full shadow-glow-blue opacity-50 animate-pulse"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.y}%`,
            animationDuration: `${Math.random() * 12 + 8}s`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}

      {/* Asymmetric modern card */}
      <div className="relative w-full max-w-lg lg:max-w-2xl group skew-x-[-2deg] hover:skew-x-0 transition-transform duration-1000">
        {/* Top floating orb */}
        <div className="absolute -top-20 -left-8 w-40 h-40 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-orange-400/20 rounded-3xl blur-3xl group-hover:scale-110 transition-all duration-1000 opacity-60"></div>
        
        <div className="glass backdrop-blur-3xl -skew-x-2 rounded-[3rem] p-12 lg:p-16 border-2 border-gradient-to-r from-purple-400/20 to-orange-400/20 shadow-genz-3d hover:shadow-glow-blue group-hover:-translate-y-6 transition-all duration-1000 relative overflow-hidden">
          {/* Diagonal accent stripe */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-orange-500/5 rotate-12 w-full h-24 translate-y-[-50%] translate-x-[-50%] blur-xl"></div>
          
          <div className="text-center relative z-10 mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-3xl shadow-glow-blue mb-8 font-extrabold text-xl tracking-wider animate-slideUp hover:scale-105 transition-transform">
              <Sparkles size={24} className="animate-pulse" />
              Join the future ✨
            </div>
            <h1 className="text-6xl lg:text-[5rem] font-black bg-gradient-to-r from-slate-900 via-purple-600 to-orange-500 bg-clip-text text-transparent drop-shadow-genz mb-6 leading-none animate-fadeIn tracking-tight">
              Create<br />Account
            </h1>
            <p className="text-2xl text-text/60 font-medium max-w-lg mx-auto leading-relaxed animate-slideUp [animation-delay:0.2s]">
              Join 50K+ creators organizing their lives
            </p>
          </div>

          {error && (
            <div className="mb-10 p-8 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-2 border-rose-400/30 rounded-3xl backdrop-blur-xl shadow-genz-soft text-rose-600 font-semibold animate-slideUp text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-text/50 group-focus-within:text-purple-500 transition-all duration-300" size={24} />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose epic username"
                  className="pl-16 pr-5 h-16 text-xl font-semibold group-hover:shadow-genz-soft focus:shadow-glow-blue focus:placeholder-transparent"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text/50 group-focus-within:text-purple-500 transition-all duration-300" size={24} />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Super secure password"
                  className="pl-16 pr-5 h-16 text-xl font-semibold group-hover:shadow-genz-soft focus:shadow-glow-blue focus:placeholder-transparent"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-20 text-2xl font-black shadow-genz-3d hover:shadow-glow-blue group-hover:scale-[1.03] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 glassPulse" disabled={loading}>
              {loading ? (
                <>
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mr-4" />
                  Creating magic...
                </>
              ) : (
                <>
                  🎉 Create My Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-16 pt-12 border-t-2 border-gradient-to-r from-purple-400/30 to-orange-400/30 text-center">
            <p className="text-xl text-text/60">
              Already creating vibes?{' '}
              <Link to="/login" className="font-black bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent hover:underline underline-offset-8 transition-all duration-500 font-extrabold text-xl">
                Sign In →
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom right floating orb */}
        <div className="absolute -bottom-24 right-[-4rem] w-48 h-48 bg-gradient-to-tl from-orange-400/20 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-all duration-1000 opacity-40 rotate-12"></div>
      </div>
    </div>
  );
};

export default Register;

