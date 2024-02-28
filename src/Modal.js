import React, { useState } from 'react';
import LoginModal from './Login'; // Import the LoginModal component
import RegisterModal from './Register'; // Import the RegisterModal component

const MainModal = () => {
  const [showInitialModal, setShowInitialModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowInitialModal(false);
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowInitialModal(false);
    setShowRegisterModal(true);
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowInitialModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {showInitialModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Choose an action</h1>
            <button onClick={handleLoginClick} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">Login</button>
            <button onClick={handleRegisterClick} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
          </div>
        </div>
      )}
      {showLoginModal && <LoginModal onClose={handleClose} />}
      {showRegisterModal && <RegisterModal onClose={handleClose} />}
    </div>
  );
};

export default MainModal;
