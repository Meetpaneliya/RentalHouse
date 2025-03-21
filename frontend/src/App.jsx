import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import SignupPage from "./components/auth/RegisterForm";
import LoginPage from "./components/auth/LoginForm";
import "./index.css";
import Rooms from "./pages/Rooms";
import Favorites from "./components/listings/Favoritelist";
import FilterSection from "./components/FilterSection";
import ListingForm from "./components/listings/ListingForm";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/reducers/Auth";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { Toaster } from "react-hot-toast";
import { useMyprofileQuery } from "./redux/APi/api";
import ForgotPassword from "./components/auth/ForgotPasswordForm";
import ResetPassword from "./components/auth/ResetPasswordForm";
import FAQSection from "./pages/FAQSection";
import MultiStepKYCForm1 from "./components/kyc/MultiStepKYCForm1";
import MultiStepKYCForm2 from "./components/kyc/MultiStepKYCForm2";
import KYC from "./pages/KYC";
import { toast } from "react-toastify";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { data, error } = useMyprofileQuery();
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
      });
    } else {
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

          <Route path="/filtered-listings" element={<FilterSection />} />
          <Route path="/room/:id" element={<Rooms />} />
          <Route path="/ListingForm" element={<ListingForm />} />
          <Route path="/favorites/:id" element={<Favorites />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQSection />} />

          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={() => <Profile />} />

          <Route path="/KYC" element={<KYC />} />
          <Route path="/MultiStepKYCForm1" element={<MultiStepKYCForm1 />} />
          <Route path="/MultiStepKYCForm2" element={<MultiStepKYCForm2 />} />
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
