import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">

      <header className="study-header">
        <div className="logo">Sweetest</div>
        <div className="site-name">Study website</div>
      </header>

      <marquee className="ticker">
        <p>This space was made for growth 🌱 Through steady effort and reflection, small moments become lasting change ⏳✨</p>
      </marquee>

      <div className="about-container">
        <h1>About Sweetest</h1>
        <p>Welcome to <strong>Sweetest</strong>, the best place to make studying easy and fun! We believe that learning should be simple, exciting, and rewarding. Whether you're preparing for a test, improving your skills, or just exploring new topics, our quizzes and study tools are here to help.</p>
        <p>At <strong>Sweetest</strong>, we offer a variety of quizzes, flashcards, and study materials to help you learn in the best way for you. Our platform is designed to be user-friendly, so you can focus on what really matters, gaining knowledge and having fun while doing it!</p>
        <p>Join us today and make studying sweeter than ever!</p>
        <p className="sub-note">Developed with love by Savio ❤</p>
        <Link to="/" className="cta-button">Join Now</Link>
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=100071174964717&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://x.com/ifech19" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://t.me/Saviox33" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-telegram"></i>
          </a>
          <a href="https://wa.me/09044321998" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      {/* Bottom Navigation */}
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
        <Link to="/about" className="nav-item active">
          <i className="fas fa-info-circle"></i>
          <span>About</span>
        </Link>
        <Link to="/games" className="nav-item">
          <i className="fa-solid fa-gamepad"></i>
          <span>Games</span>
        </Link>
      </nav>

    </div>
  );
}