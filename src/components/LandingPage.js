import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import a CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content-wrapper">
        <h1 className="landing-title">
          Welcome to EasyList
          <span className="title-decoration"></span>
        </h1>
        <p className="landing-description">
          Organize and manage your shopping lists with ease. Start now by logging in or creating a new account.
        </p>
        <div className="landing-buttons">
          <Link to="/login" className="button login-button">
            <span>Login</span>
          </Link>
          <Link to="/register" className="button register-button">
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
