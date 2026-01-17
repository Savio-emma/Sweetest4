import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Nature.css';

export default function NatureMemory() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // 12 unique nature emojis × 2 = 24 cards
  const emojis = [
    '🌳', '🌸', '🐦', '🦋', '🌺', '🍃',
    '🌻', '🐝', '🍁', '🍀', '🌲', '🌿'
  ];

  const playSound = (frequency, duration) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const audioCtx = audioCtxRef.current;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
  };

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startNewGame = () => {
    const pairEmojis = [...emojis, ...emojis]; // 24 cards - exact pairs
    const shuffled = shuffle(pairEmojis);
    const initialCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }));

    setCards(initialCards);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setElapsedTime(0);
    setGameWon(false);
    setStartTime(Date.now());

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - Date.now()) / 1000));
    }, 1000);
  };

  useEffect(() => {
    startNewGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  const handleCardClick = (index) => {
    if (
      gameWon ||
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);

      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        // Match
        setMatchedIndices((prev) => [...prev, first, second]);
        playSound(700, 0.18); // pleasant match sound
        setFlippedIndices([]);

        // Check win
        if (matchedIndices.length + 2 === cards.length) {
          setGameWon(true);
          clearInterval(timerRef.current);
          playSound(900, 0.4); // win fanfare
        }
      } else {
        // No match → flip back after delay
        playSound(300, 0.12); // mismatch sound
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const isFlipped = (index) =>
    flippedIndices.includes(index) || matchedIndices.includes(index);

  const isMatched = (index) => matchedIndices.includes(index);

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/games" className="back-link">
          ← Back to Games
        </Link>
        <div className="logo">Sweetest</div>
      </header>

      <main className="memory-main">
        <h1 className="memory-title">🌿 Nature Memory Match 🌿</h1>

        <div className="stats">
          <div>Moves: <span>{moves}</span></div>
          <div>Time: <span>{elapsedTime}s</span></div>
        </div>

        <div className="memory-grid">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`memory-card 
                ${isFlipped(index) ? 'flipped' : ''} 
                ${isMatched(index) ? 'matched' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </div>
          ))}
        </div>

        {gameWon && (
          <div className="win-overlay">
            <div className="win-box">
              <h2>🎉 You Won! 🎉</h2>
              <p>
                Moves: <strong>{moves}</strong> | Time: <strong>{elapsedTime}s</strong>
              </p>
              <button onClick={startNewGame} className="play-again-btn">
                Play Again
              </button>
            </div>
          </div>
        )}

        <button onClick={startNewGame} className="new-game-btn">
          New Game
        </button>
      </main>
    </div>
  );
}