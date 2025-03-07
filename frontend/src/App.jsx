import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import SignupPage from './pages/Register'
import LoginPage from './pages/Login'
import './index.css'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <BrowserRouter>
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
  )
}

export default App