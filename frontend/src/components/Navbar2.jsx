import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Importing icons

const Navbar = ({ setShowLoginModal, setShowSignupModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-md bg-white">
      <div className="flex justify-between items-center px-6 md:px-10 py-4 ">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-800">June</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-indigo-800 font-semibold hover:text-indigo-600 transition">About</Link>
          <Link to="/filtered-listings" className="text-indigo-800 font-semibold hover:text-indigo-600 transition">Cities</Link>
          <Link to="/contact" className="text-indigo-800 font-semibold hover:text-indigo-600 transition">Contact</Link>

          <button 
            onClick={() => setShowLoginModal(true)}
            className="text-indigo-800 font-semibold hover:text-indigo-600 transition"
          >
            Login
          </button>

          <button
            onClick={() => setShowSignupModal(true)} 
            className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-900 transition-all"
          >
            Sign Up
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-indigo-800 text-3xl focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu (Appears on small screens) */}
      <div 
        className={`md:hidden flex flex-col items-center space-y-5 py-6 bg-white shadow-lg transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}
      >
        <Link to="/about" className="text-indigo-800 font-semibold hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/filtered-listings" className="text-indigo-800 font-semibold hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>Cities</Link>
        <Link to="/contact" className="text-indigo-800 font-semibold hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>Contact</Link>

        <button 
          onClick={() => { setShowLoginModal(true); setMenuOpen(false); }}
          className="text-indigo-800 font-semibold hover:text-indigo-600 transition"
        >
          Login
        </button>

        <button
          onClick={() => { setShowSignupModal(true); setMenuOpen(false); }} 
          className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-900 transition"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
