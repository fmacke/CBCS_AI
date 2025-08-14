import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/company-logo.png" alt="Company Logo" className="company-logo" />
      </div>
      <nav className="nav-menu">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/processes" className="nav-item">Processes</Link>
      </nav>
    </header>
  );
};

export default Header;