import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import SignupPage from "./pages/Register";
import LoginPage from "./pages/Login";
import axios from "axios";
import "./index.css";
import Rooms from "./pages/Rooms";
import Favorites from "./pages/Favorites";
import { server } from "./lib/config";
import Listings from "./pages/Listings";
import ListingForm from "./pages/ListingForm";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/reducers/Auth";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { Toaster } from "react-hot-toast";


function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(login(response.data.user));
      })
      .catch(() => dispatch(logout()));
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        setShowLoginModal(true);
      });
    } else {
      setShowLoginModal(false);
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

          <Route path="/filtered-listings" element={<Listings />} />
          <Route path="/room/:id" element={<Rooms />} />
          <Route path="/ListingForm" element={<ListingForm />} />

          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          
          <Route path="/favorites/:id" element={<Favorites />}/>
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
