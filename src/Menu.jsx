// Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Menu.css';
import Firsts from './Firsts';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link to="/dev" className="nav-item">
        <i className="fa-solid fa-code"></i>
        <span>Dev</span>
      </Link>
      <Link to="/menu" className="nav-item active">
        <i className="fa-solid fa-bars"></i>
        <span>Menu</span>
      </Link>
      <Link to="/about" className="nav-item">
        <i className="fas fa-info-circle"></i>
        <span>About</span>
      </Link>
      <Link to="/games" className="nav-item">
        <i className="fa-solid fa-gamepad"></i>
        <span>Games</span>
      </Link>
    </nav>
  );
}

export default function Menu() {
  return (
    <div className="app-container">

      {/* Header */}
      <header className="header">
        <div className="logo">Sweetest</div>
        <div className="tagline site-name">Study website</div>
      </header>

      {/* Marquee / Ticker */}
      <marquee className="ticker">
        <p>Choice is the quiet power behind direction 👣 Each decision shapes the path before it is walked 🧠🛤️</p>
      </marquee>

      {/* Main Menu Content */}
      <main className="menu-main">
        <div className="menu-container">
          <details>
            <summary>First Semester</summary>
            <div className="links">
              {/* Replace with real links when you create those pages */}
              <Link to="/firsts">Study Materials</Link>
              <Link to="/firste">Exam Preparations</Link>
            </div>
          </details>

          <details>
            <summary>Second Semester</summary>
            <div className="links">
              <Link to="#">coming soon...</Link>
              
            </div>
          </details>

          <details>
            <summary>CBT Mode</summary>
            <div className="links">
              <Link to="#">coming soon...</Link>
              {/* <a href="#">None</a> → better to use Link if using router */}
            </div>
          </details>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}