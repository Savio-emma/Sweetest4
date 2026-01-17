// Raindrop.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Raindrop.css';

export default function Raindrop() {
  const canvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('raindropBest') || '0'));
  const [misses, setMisses] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  const bucket = useRef({ x: 150, width: 90, height: 25 });
  const coins = useRef([]);
  const dropSpeed = useRef(2.2);
  const spawnRate = useRef(0.018); // lower = fewer coins
  const canvasSize = useRef({ width: 360, height: 480 });

  const keys = useRef({});
  const animationFrame = useRef(null);

  // Save best score
  useEffect(() => {
    localStorage.setItem('raindropBest', best.toString());
  }, [best]);

  // Resize handling
  useEffect(() => {
    const resize = () => {
      const w = Math.min(window.innerWidth - 40, 360);
      canvasSize.current = { width: w, height: w * 1.33 };
      bucket.current.width = w * 0.25;
      bucket.current.x = (w - bucket.current.width) / 2;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Input handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseMove = (e) => {
      if (!gameRunning) return;
      const rect = canvas.getBoundingClientRect();
      bucket.current.x = Math.max(0, Math.min(canvasSize.current.width - bucket.current.width, e.clientX - rect.left - bucket.current.width / 2));
    };

    const onTouchMove = (e) => {
      if (!gameRunning) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      bucket.current.x = Math.max(0, Math.min(canvasSize.current.width - bucket.current.width, e.touches[0].clientX - rect.left - bucket.current.width / 2));
    };

    const onKeyDown = (e) => { keys.current[e.key] = true; };
    const onKeyUp = (e) => { keys.current[e.key] = false; };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gameRunning]);

  // Main game loop
  const loop = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !gameRunning) return;

    const { width, height } = canvasSize.current;

    // Keyboard movement
    if (keys.current['ArrowLeft'] || keys.current['a'] || keys.current['A']) {
      bucket.current.x -= 7;
    }
    if (keys.current['ArrowRight'] || keys.current['d'] || keys.current['D']) {
      bucket.current.x += 7;
    }
    bucket.current.x = Math.max(0, Math.min(width - bucket.current.width, bucket.current.x));

    // Spawn coin occasionally
    if (Math.random() < spawnRate.current) {
      coins.current.push({
        x: Math.random() * (width - 24) + 12,
        y: -20,
        size: 14 + Math.random() * 6,
        speed: dropSpeed.current + Math.random() * 1.2
      });
    }

    // Update & filter coins
    let caughtThisFrame = 0;
    coins.current = coins.current.filter(coin => {
      coin.y += coin.speed;

      // Caught?
      if (
        coin.y + coin.size > height - bucket.current.height &&
        coin.x > bucket.current.x - coin.size / 2 &&
        coin.x < bucket.current.x + bucket.current.width + coin.size / 2
      ) {
        caughtThisFrame++;
        return false;
      }

      // Missed?
      if (coin.y > height + 20) {
        setMisses(m => m + 1);
        return false;
      }

      return true;
    });

    if (caughtThisFrame > 0) {
      setScore(s => {
        const newScore = s + caughtThisFrame;
        if (newScore > best) setBest(newScore);
        // Gentle difficulty increase
        if (newScore % 8 === 0 && newScore > 0) {
          dropSpeed.current += 0.25;
          spawnRate.current = Math.min(0.035, spawnRate.current + 0.003);
        }
        return newScore;
      });
    }

    // Game over check
    if (misses >= 5 || coins.current.length > 18) {
      setGameRunning(false);
      return;
    }

    // Draw - keep it very simple
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(0, 0, width, height);

    // Coins (simple yellow circles + emoji)
    coins.current.forEach(c => {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `${c.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🪙', c.x, c.y + 2);
    });

    // Simple bucket
    ctx.fillStyle = '#64748b';
    ctx.fillRect(bucket.current.x, height - bucket.current.height, bucket.current.width, bucket.current.height);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(bucket.current.x + 4, height - bucket.current.height + 4, bucket.current.width - 8, bucket.current.height - 8);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CATCH', bucket.current.x + bucket.current.width / 2, height - 8);

    animationFrame.current = requestAnimationFrame(loop);
  }, [gameRunning, misses, best]);

  // Start / restart
  const startGame = () => {
    setScore(0);
    setMisses(0);
    coins.current = [];
    dropSpeed.current = 2.2;
    spawnRate.current = 0.018;
    setGameRunning(true);
  };

  // Run loop when game is active
  useEffect(() => {
    if (gameRunning) {
      animationFrame.current = requestAnimationFrame(loop);
    }
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [gameRunning, loop]);

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/games" className="back-link">
          ← Back to Games
        </Link>
        <div className="logo">Sweetest</div>
      </header>

      <main className="game-main">
        <h1 className="game-title">Coin Catcher</h1>

        <div className="stats-row">
          <div>Score: <strong>{score}</strong></div>
          <div>Best: <strong>{best}</strong></div>
          <div>Misses: <strong>{misses}/5</strong></div>
        </div>

        <canvas
          ref={canvasRef}
          width={canvasSize.current.width}
          height={canvasSize.current.height}
          className="game-canvas"
        />

        {!gameRunning ? (
          <button onClick={startGame} className="start-button">
            {score > 0 ? 'Play Again' : 'Start'}
          </button>
        ) : (
          <button onClick={() => setGameRunning(false)} className="pause-button">
            Pause
          </button>
        )}

        <p className="help-text">
          Move with mouse, touch, or ← →
        </p>
      </main>
    </div>
  );
}