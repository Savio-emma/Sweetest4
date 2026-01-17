// src/pages/Games.jsx  (or wherever your pages live)
import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css'; 

function Games() {
  return (
    <div className="app-container">
      {/* Header – reuse your style */}
      <header className="header">
        <div className="logo">Sweetest</div>
        <div className="tagline site-name">Games Zone</div>
      </header>

      <main className="games-main">
        <h1 className="games-title">Mini Games Collection</h1>
        <p className="games-subtitle">Relax between study sessions • All games are quick & fun</p>

        <div className="games-grid">
          <Link to="/raindrop" className="game-card">
            <div className="game-icon">💧</div>
            <h2>Raindrop Catcher</h2>
            <p>Catch falling coins / raindrops before they hit the ground!</p>
          </Link>

          <Link to="/nature" className="game-card">
            <div className="game-icon">🌿</div>
            <h2>Nature Memory Match</h2>
            <p>Flip cards to find matching nature pairs – test your memory</p>
          </Link>

          <Link to="/rock" className="game-card">
            <div className="game-icon">✊✋✌️</div>
            <h2>Rock Paper Scissors</h2>
            <p>Classic hand game against the computer</p>
          </Link>

          <Link to="/slider" className="game-card">
            <div className="game-icon">2048</div>
            <h2>Mini 2048 Slider</h2>
            <p>Slide tiles, combine numbers, aim for 2048 (compact version)</p>
          </Link>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link to="/developer" className="nav-item">
          <i className="fa-solid fa-code"></i>
          <span>Developer</span>
        </Link>
        <Link to="/menu" className="nav-item">
          <i className="fa-solid fa-bars"></i>
          <span>Menu</span>
        </Link>
        <Link to="/about" className="nav-item">
          <i className="fas fa-info-circle"></i>
          <span>About</span>
        </Link>
        <Link to="/games" className="nav-item active">
          <i className="fa-solid fa-gamepad"></i>
          <span>Games</span>
        </Link>
      </nav>
    </div>
  );
}

export default Games;