import React from 'react';

const Navbar = () => {
    return (
        <header className="flex justify-between w-full px-8 py-4 shadow-md">
            <h1 className="text-2xl font-semibold text-slate-200">June</h1>
            <nav className="space-x-16">
                <a href="#" className="text-slate-200 font-semibold hover:text-gray-400">About</a>
                <a href="#" className="text-slate-200 font-semibold hover:text-gray-400">Cities</a>
                <a href="#" className="text-slate-200 font-semibold hover:text-gray-400">contact</a>
                
                <a href="#" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition">Sign Up</a>
            </nav>
        </header>
    );
};

export default Navbar;