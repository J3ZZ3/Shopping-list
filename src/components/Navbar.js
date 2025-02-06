import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; // Adjust the path to where your logo is stored

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setShowConfirmation(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/home">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
          <span className="logo-text">EASYLIST</span>
        </div>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="navbar-link">Profile</Link>
              <button 
                onClick={handleLogoutClick} 
                className={`navbar-button ${isLoggingOut ? 'loading' : ''}`}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <span className="loading-spinner"></span>
                ) : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button 
                onClick={handleLogoutConfirm} 
                className="modal-button confirm"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Yes, Logout'}
              </button>
              <button 
                onClick={handleLogoutCancel} 
                className="modal-button cancel"
                disabled={isLoggingOut}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
