import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import a CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to the Shopping List App</h1>
      <p className="landing-description">
        Organize and manage your shopping lists with ease. Start now by logging in or creating a new account.
      </p>
      <div className="landing-buttons">
        <Link to="/login" className="button login-button">Login</Link>
        <Link to="/register" className="button register-button">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
