import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLoginModal, setShowSignupModal }) => {
    return (
        <header className="flex justify-between w-full px-8 py-4 shadow-md">
            <Link to="/" className="text-2xl font-semibold text-indigo-800">June</Link>
            <nav className="space-x-16">
                <Link to="/about" className="text-indigo-800 font-semibold hover:text-indigo-800">About</Link>
                <Link to="/cities" className="text-indigo-800 font-semibold hover:text-indigo-800">Cities</Link>
                <Link to="/contact" className="text-indigo-800 font-semibold hover:text-indigo-800">Contact</Link>
                
                <button 
                    onClick={() => setShowLoginModal(true)}
                    className="text-indigo-800 font-semibold hover:text-indigo-800"
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
