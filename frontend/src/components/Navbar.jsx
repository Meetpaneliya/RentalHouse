import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLoginModal, setShowSignupModal }) => {
  return (
    <header className="flex justify-between w-full px-8 py-4 shadow-md">
      <Link to="/" className="text-2xl font-semibold text-slate-200">
        June
      </Link>
      <nav className="space-x-16">
        <Link
          to="/about"
          className="text-slate-200 font-semibold hover:text-gray-400"
        >
          About
        </Link>
        <Link
          to="/cities"
          className="text-slate-200 font-semibold hover:text-gray-400"
        >
          Cities
        </Link>
        <Link
          to="/contact"
          className="text-slate-200 font-semibold hover:text-gray-400"
        >
          Contact
        </Link>

        <button
          onClick={() => setShowLoginModal(true)}
          className="text-slate-200 font-semibold hover:text-gray-400"
        >
          Login
        </button>
        <button
          onClick={() => setShowSignupModal(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
