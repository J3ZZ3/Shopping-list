import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ children }) => {
  return (
    <>
      <div className="animated-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      <div className="content-wrapper">
        {children}
      </div>
    </>
  );
};

export default AnimatedBackground; 