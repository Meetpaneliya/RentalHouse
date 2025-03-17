import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice.jsx"; // Adjust the path as needed
import { toast } from "react-toastify";
import { useLogoutuserMutation } from "../redux/APi/api";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ setShowLoginModal, setShowSignupModal }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [logoutUser, { isLoading: isloggingOut }] = useLogoutuserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logout Successfully.")
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out.");
    }
  };


  return (
    <header className="bg-transparent text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold">
          June
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/filtered-listings" className="hover:text-gray-400">
            Cities
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </nav>

        {/* Right Section: Buttons & Profile */}
        {isAuthenticated ? (
          <div className="relative group p-2">
            <User className="p-2 h-10 w-10 shadow-md rounded-full cursor-pointer hover:text-gray-200" />
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded shadow-lg hidden group-hover:block">
              <p className="block px-4 py-2 text-xs font-semibold hover:bg-gray-100">
                {`Logged in as ${user.email}`}
              </p>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                disabled={isloggingOut}
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="hover:text-gray-400"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-transparent/40 text-white px-6 py-4 space-y-2">
          <Link to="/about" className="block hover:text-gray-400">
            About
          </Link>
          <Link to="/cities" className="block hover:text-gray-400">
            Cities
          </Link>
          <Link to="/contact" className="block hover:text-gray-400">
            Contact
          </Link>

          {!isAuthenticated ? (
            <div className="flex flex-col space-y-2 mt-6">
              <button
                onClick={() => setShowLoginModal(true)}
                className="block w-full text-left  rounded hover:text-gray-300/30 transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="block w-full text-left rounded hover:text-gray-300/30 transition"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              disabled={isloggingOut}
              className="block w-full text-left rounded hover:text-gray-300/30 transition"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
