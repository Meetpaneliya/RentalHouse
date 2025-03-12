import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border dark:bg-gray-800">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="mr-2" /> Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaCog className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setIsOpen(false);
                  alert("Logged out!"); // Replace with actual logout logic
                }}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
