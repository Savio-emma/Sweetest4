import React, { useState, useRef } from 'react';
import './App.css';

const MAX_DEVICES_PER_ACCOUNT = 1;
const STORAGE_ACCOUNTS_KEY = 'study_accounts';
const STORAGE_CURRENT_USER_KEY = 'current_user_email';
const ADMIN_SECRET = 'admin123seed';

const getSimpleFingerprint = () => {
  const data = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 'unknown',
  ].join('|');

  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <a href="/" className="nav-item">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </a>
      <a href="/dev" className="nav-item active">
        <i className="fa-solid fa-code"></i>
        <span>Dev</span>
      </a>
      <a href="/menu" className="nav-item">
        <i className="fa-solid fa-bars"></i>
        <span>Menu</span>
      </a>
      <a href="/about" className="nav-item">
        <i className="fas fa-info-circle"></i>
        <span>About</span>
      </a>
      <a href="/games" className="nav-item">
        <i className="fa-solid fa-gamepad"></i>
        <span>Games</span>
      </a>
    </nav>
  );
}

export default function Dev() {
  const [currentFingerprint] = useState(getSimpleFingerprint);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminSecretInput, setAdminSecretInput] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');

  const getAccounts = () => JSON.parse(localStorage.getItem(STORAGE_ACCOUNTS_KEY) || '{}');
  const saveAccounts = (accounts) => localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));

  const loginFormRef = useRef(null);
  const handleLogin = (e) => {
  e.preventDefault();
  setError('');

  const lowerEmail = email.toLowerCase().trim();
  if (!lowerEmail || !password) {
    setError('Enter email and password');
    setPassword('');
    return;
  }

  const accounts = getAccounts();
  const user = accounts[lowerEmail];

  if (!user) {
    setError('No such user. Contact admin.');
    return;
  }

  if (user.password !== password) {
    setError('Incorrect password');
    return;
  }

  if (!user.devices.includes(currentFingerprint)) {
    if (user.devices.length >= MAX_DEVICES_PER_ACCOUNT) {
      setError(`This account has reached the limit of ${MAX_DEVICES_PER_ACCOUNT} device(s).`);
      return;
    }
    user.devices.push(currentFingerprint);
    saveAccounts(accounts);
  }

  // ── SUCCESS ──
  localStorage.setItem(STORAGE_CURRENT_USER_KEY, lowerEmail); 
  setIsAuthenticated(true);

  // Clear the form fields after successful login
  if (loginFormRef.current) {
    loginFormRef.current.reset();
  }

  setEmail('');
  setPassword('');
  setError(''); 
};

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const unlockAdmin = (e) => {
    e.preventDefault();
    if (adminSecretInput === ADMIN_SECRET) {
      setShowAdminPanel(true);
      setAdminSecretInput('');
    } else {
      setAdminMessage('Try again');
    }
  };

  const createUser = (e) => {
    e.preventDefault();
    const lowerNewEmail = newEmail.toLowerCase().trim();
    if (!lowerNewEmail || !newPassword) {
      setAdminMessage('Fill email and password');
      return;
    }

    const accounts = getAccounts();
    if (accounts[lowerNewEmail]) {
      setAdminMessage('User already exists');
      return;
    }

    accounts[lowerNewEmail] = {
      password: newPassword,
      devices: [],
    };

    saveAccounts(accounts);
    setAdminMessage(`User created: ${lowerNewEmail} / password: ${newPassword}`);
    setNewEmail('');
    setNewPassword('');
  };

  // ──────────────────────────────────────────────
  // LOGIN SCREEN
  // ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h2>Login As a co-admin?</h2>
          <p>Open to developers only.</p>

          <form ref={loginFormRef} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          {error && <div className="error-message">{error}</div>}

          <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#777', textAlign: 'center' }}>
            Admin?
            <form onSubmit={unlockAdmin} style={{ marginTop: '0.5rem' }}>
              <input
                type="password"
                value={adminSecretInput}
                onChange={(e) => setAdminSecretInput(e.target.value)}
                placeholder="Admin code"
                style={{ width: '180px', fontSize: '0.9rem' }}
              />
              <button type="submit" style={{ fontSize: '0.9rem', marginLeft: '8px' }}>→</button>
            </form>
            {adminMessage && <div style={{ color: '#c0392b' }}>{adminMessage}</div>}
          </div>

{showAdminPanel && (
  <div className="admin-panel">
    <h3>Admin: Manage Users</h3>

    {/* Create new user */}
    <form onSubmit={createUser}>
      <input
        type="email"
        placeholder="Student email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Assign password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Create User</button>
    </form>

    {/* User list + delete */}
    <div style={{ marginTop: '1.8rem' }}>
      <h4>Existing Users</h4>
      {Object.keys(getAccounts()).length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No users created yet.</p>
      ) : (
        <ul>
          {Object.keys(getAccounts()).map((userEmail) => (
            <li key={userEmail}>
              <span>{userEmail}</span>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm(`Delete user ${userEmail}?`)) {
                    const accounts = getAccounts();
                    delete accounts[userEmail];
                    saveAccounts(accounts);
                    setAdminMessage(`User ${userEmail} deleted`);
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>

    {adminMessage && (
      <div className="admin-message">{adminMessage}</div>
    )}

    <button
      className="close-btn"
      onClick={() => setShowAdminPanel(false)}
    >
      Close Admin Panel
    </button>
  </div>
)}
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // PROTECTED CONTENT
  // ──────────────────────────────────────────────
  return (
    <div className="page-wrapper">
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <section className="past-questions-section">
        <header className="page-header">
          <div className="logo">Sweetest</div>
          <div className="site-name">Study Website</div>
        </header>

        <div className="intro-comment">
          Click the file icon to view online or the download icon to save offline
        </div>

        {/* 1st Semester */}
        <div className="semester-block">
          <h2>1st Semester Past Questions</h2>
          <div className="grid-container">
            
            <div className="document-card">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="view-link"
              >
                <i className="fa-solid fa-file-lines"></i>
              </a>
              <p className="subject-title">Blanc</p>
              <a
                href="#"
                download
                className="download-btn"
              >
                <i className="fa-solid fa-download"></i>
              </a>
            </div>

            
          </div>
        </div>

        {/* 2nd Semester */}
        <div className="semester-block">
          <h2>2nd Semester Past Questions</h2>
          <div className="grid-container">
            {/* Add your full list of cards here */}
            <div className="document-card">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="view-link"
              >
                <i className="fa-solid fa-file-lines"></i>
              </a>
              <p className="subject-title">Blanc</p>

               <a
                href="#"
                download
                className="download-btn"
              >
                <i className="fa-solid fa-download"></i>
              </a>
            </div>

            
          </div>
        </div>

        <a href="/" className="go-back-btn">
          <i className="fa-solid fa-left-long"></i> Back to Home
        </a>
      </section>

      <BottomNav />
    </div>
  );
}