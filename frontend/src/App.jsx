import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import SignupPage from "./pages/Register";
import LoginPage from "./pages/Login";
import axios from "axios";
import "./index.css";
import Rooms from "./pages/Rooms";
import { server } from "./lib/config";
import Listings from "./pages/Listings";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/reducers/Auth";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useMyprofileQuery } from "./redux/APi/api";
import ForgotPassword from "./components/auth/ForgotPasswordForm";
import ResetPassword from "./components/auth/ResetPasswordForm";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { data, error, isLoading } = useMyprofileQuery();
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (data && data.user) {
      dispatch(login(data.user));
    } else if (error) {
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setShowLoginModal(true);
      }, 15000);
    }

    if (isAuthenticated) {
      setShowLoginModal(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Toaster position="top-left" />
      <div className="relative">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
                showSignupModal={showSignupModal}
                setShowSignupModal={setShowSignupModal}
              />
            }
          />

          <Route path="/signup" element={<SignupPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={() => <Profile />} />
          <Route path="/Room" element={<Rooms />} />
          <Route path="/listings" element={<Listings />} />
        </Routes>

        {/* Modal Overlays */}
        {(showLoginModal || showSignupModal) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        )}

        {showLoginModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <LoginPage onClose={() => setShowLoginModal(false)} />
          </div>
        )}

        {showSignupModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <SignupPage onClose={() => setShowSignupModal(false)} />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
