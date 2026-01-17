import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Example pages (replace with your actual components)
import Dev from "./Dev";
import Menu from "./Menu";
import About from "./About";
import Games from "./Games";
import Firsts from "./Firsts";
import Firste from "./Firste";
import Raindrop from "./Raindrop";
import Nature from "./Nature";
import Rock from "./Rock";
import Slider from "./Slider";

// ----- App Main Component -----
function App() {
  const [showPopup, setShowPopup] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning 🌅";
    if (hour < 18) return "Good afternoon ☀️";
    return "Good evening 🌙";
  };

  const [greeting] = useState(getGreeting);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      <Header />

      <marquee className="ticker">
        <p>Start where you are 📍 Progress begins the moment you focus 🎯</p>
      </marquee>

      <div className="greeting">{greeting}</div>

      <div className="quick-bar">
        <span>Quick options</span>
        <span>{time.toLocaleTimeString()}</span>
      </div>

      <Grid />
      <Carousel />
      <BottomNav />

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

// ----- Header -----
function Header() {
  return (
    <header className="header">
      <h1 className="logo">Sweetest 4</h1>
      <span className="tagline">Study Website</span>
    </header>
  );
}

// ----- Grid -----
const links = [
  { icon: "fa-landmark", label: "Study 1st Sem", url: "/Firsts" },
  { icon: "fa-pen-nib", label: "Exam 1st Sem", url: "/Firste" },
  { icon: "fa-code", label: "Developer", url: "/Dev" },
  { icon: "fa-graduation-cap", label: "Study 2nd Sem", url: "/Menu" },
  { icon: "fa-pencil-alt", label: "Exam 2nd Sem", url: "/Menu" },
  { icon: "fa-bars", label: "Menu", url: "/Menu" },
  { icon: "fa-comments", label: "WhatsApp", url: "/About" },
  { icon: "fa-info-circle", label: "About", url: "/About" },
  { icon: "fa-gamepad", label: "Games", url: "/Games" },
];

function Grid() {
  return (
    <main className="grid">
      {links.map((item) => (
        <Link to = {item.url}  key={item.label} className="grid-card"
          aria-label={item.label}
        >
          <i className={`fa-solid ${item.icon}`} />
          <span>{item.label}</span>
        </Link>
      ))}
    </main>
  );
}

// ----- Carousel -----
const ads = [
  {
    img: "https://i.pinimg.com/736x/21/b3/b4/21b3b4a7b03ec17da69f40c934826983.jpg",
    link: "https://whatsapp.com/channel/0029ValBBWBJENxyb3UQwg23",
  },
  {
    img: "https://i.pinimg.com/736x/9f/81/f7/9f81f76e64b25f41607c004c3926fb05.jpg",
    link: "https://emitech-ng.vercel.app/",
  },
  {
    img: "https://i.pinimg.com/736x/e7/1e/95/e71e95b894cd4f85716adb14048a338b.jpg",
    link: "https://savioifee.vercel.app",
  },
];

function Carousel() {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % ads.length);
  const prev = () => setIndex((i) => (i - 1 + ads.length) % ads.length);
  const goTo = (i) => setIndex(i);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isHovering) next();
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = ads[index].img;
  }, [index]);

  return (
    <section className="carousel" role="region" aria-label="Featured advertisements">
      <h3 className="carousel-title">Featured</h3>

      <div
        className="carousel-box"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button onClick={prev} className="carousel-btn prev" aria-label="Previous advertisement">
          ❮
        </button>

        <div className="carousel-slides">
          {ads.map((ad, i) => (
            <a
              key={i}
              href={ad.link}
              target="_blank"
              rel="noreferrer"
              className={`carousel-slide ${i === index ? "active" : ""}`}
              aria-label={`Advertisement: ${ad.link}`}
            >
              <img
                src={ad.img}
                alt="Featured advertisement"
                className={isLoaded ? "loaded" : ""}
                onLoad={() => setIsLoaded(true)}
              />
              {!isLoaded && <div className="carousel-placeholder">Loading...</div>}
            </a>
          ))}
        </div>

        <button onClick={next} className="carousel-btn next" aria-label="Next advertisement">
          ❯
        </button>
      </div>

      <div className="carousel-dots" role="tablist">
        {ads.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to advertisement ${i + 1}`}
            aria-selected={i === index}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}

// ----- BottomNav -----
function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/" className="active"> <i className="fas fa-home" /> Home </Link>
      <Link to="/dev"> <i className="fa-solid fa-code" /> Dev </Link>
      <Link to="/menu"> <i className="fa-solid fa-bars" /> Menu </Link>
      <Link to="/about"> <i className="fas fa-info-circle" /> About </Link>
      <Link to="/games"> <i className="fa-solid fa-gamepad" /> Games </Link>
    </nav>
  );
}

// ----- Popup -----
function Popup({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <h2>Welcome to Sweetest 4 ✨</h2>
        <p>Study, test your memory, and challenge your intellect.</p>
        <button onClick={onClose}>Proceed</button>
      </div>
    </div>
  );
}

// ----- Root Wrapper with Routing -----
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/firsts" element={<Firsts />} />
        <Route path="/firste" element={<Firste />} />
        <Route path="/raindrop" element={<Raindrop />} />
        <Route path="/nature"   element={<Nature />} />
        <Route path="/rock"     element={<Rock />} />
        <Route path="/slider"   element={<Slider />} />

        <Route path="*" element={
    <div style={{ padding: "80px 20px", textAlign: "center", color: "#e11d48" }}>
      <h1>404 – No route matches</h1>
      <p>Current path: <strong>{window.location.pathname}</strong></p>
      <p>Check your <code>&lt;Route path=...&gt;</code> definitions</p>
    </div>
  } />
      </Routes>
    </BrowserRouter>
  );
}
