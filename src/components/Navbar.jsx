import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, Calendar, Home, Plus } from 'lucide-react'
import { Button } from './ui/button' // placeholder, use native for now

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass backdrop-blur-xl shadow-glass-1 glass-hover rounded-b-genz-xl animate-slideUp">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-pastel-500 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-genz">
        📅 Calendar
      </Link>

      <div className="flex items-center gap-2">
        {token ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/dashboard" className="flex items-center gap-1">
                <Home size={18} /> Dash
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/calendar" className="flex items-center gap-1">
                <Calendar size={18} /> Calendar
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/create-event" className="flex items-center gap-1">
                <Plus size={18} /> New
              </Link>
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-1">
              <LogOut size={18} /> Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
