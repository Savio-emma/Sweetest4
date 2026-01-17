// Mini2048.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Slider.css';

const GRID_SIZE = 4;
const INITIAL_TILES = 2;

export default function Mini2048() {
  const [board, setBoard] = useState(() => createEmptyBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('mini2048Best') || '0');
  });
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const touchStart = useRef({ x: 0, y: 0 });

  // Create empty board
  function createEmptyBoard() {
    const newBoard = Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }

  // Add a random 2 or 4
  function addRandomTile(boardCopy) {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (boardCopy[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    if (emptyCells.length === 0) return;
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardCopy[row][col] = Math.random() < 0.9 ? 2 : 4;
  }

  // Deep copy board
  const copyBoard = (b) => b.map(row => [...row]);

  // Slide logic (one direction)
  const slide = (row) => {
    let newRow = row.filter(val => val !== 0);
    let addedScore = 0;

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        addedScore += newRow[i];
        newRow.splice(i + 1, 1);
      }
    }

    while (newRow.length < GRID_SIZE) {
      newRow.push(0);
    }

    return { newRow, addedScore };
  };

  const move = (direction) => {
    if (gameOver) return;

    let newBoard = copyBoard(board);
    let moved = false;
    let addedScore = 0;

    if (direction === 'left') {
      for (let i = 0; i < GRID_SIZE; i++) {
        const { newRow, addedScore: scoreAdd } = slide(newBoard[i]);
        if (JSON.stringify(newRow) !== JSON.stringify(board[i])) moved = true;
        newBoard[i] = newRow;
        addedScore += scoreAdd;
      }
    } else if (direction === 'right') {
      for (let i = 0; i < GRID_SIZE; i++) {
        const reversed = [...newBoard[i]].reverse();
        const { newRow: slid, addedScore: scoreAdd } = slide(reversed);
        const newRow = slid.reverse();
        if (JSON.stringify(newRow) !== JSON.stringify(board[i])) moved = true;
        newBoard[i] = newRow;
        addedScore += scoreAdd;
      }
    } else if (direction === 'up') {
      for (let j = 0; j < GRID_SIZE; j++) {
        let col = [];
        for (let i = 0; i < GRID_SIZE; i++) col.push(newBoard[i][j]);
        const { newRow: slid, addedScore: scoreAdd } = slide(col);
        if (JSON.stringify(slid) !== JSON.stringify(col)) moved = true;
        for (let i = 0; i < GRID_SIZE; i++) newBoard[i][j] = slid[i];
        addedScore += scoreAdd;
      }
    } else if (direction === 'down') {
      for (let j = 0; j < GRID_SIZE; j++) {
        let col = [];
        for (let i = 0; i < GRID_SIZE; i++) col.push(newBoard[i][j]);
        const reversed = col.reverse();
        const { newRow: slid, addedScore: scoreAdd } = slide(reversed);
        const newCol = slid.reverse();
        if (JSON.stringify(newCol) !== JSON.stringify(col)) moved = true;
        for (let i = 0; i < GRID_SIZE; i++) newBoard[i][j] = newCol[i];
        addedScore += scoreAdd;
      }
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(prev => prev + addedScore);

      // Update best score
      if (score + addedScore > bestScore) {
        setBestScore(score + addedScore);
        localStorage.setItem('mini2048Best', (score + addedScore).toString());
      }

      // Check game over
      if (!canMove(newBoard)) {
        setGameOver(true);
        setMessage("Game Over! No moves left.");
      }
    }
  };

  // Check if any move is possible
  function canMove(b) {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (b[i][j] === 0) return true;
        if (j < GRID_SIZE - 1 && b[i][j] === b[i][j + 1]) return true;
        if (i < GRID_SIZE - 1 && b[i][j] === b[i + 1][j]) return true;
      }
    }
    return false;
  }

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') move('left');
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') move('right');
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') move('up');
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') move('down');
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board, gameOver]);

  // Touch/swipe support
  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current.x || !touchStart.current.y) return;

    const diffX = e.changedTouches[0].clientX - touchStart.current.x;
    const diffY = e.changedTouches[0].clientY - touchStart.current.y;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 40) move('right');
      else if (diffX < -40) move('left');
    } else {
      if (diffY > 40) move('down');
      else if (diffY < -40) move('up');
    }

    touchStart.current = { x: 0, y: 0 };
  };

  const startNewGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setGameOver(false);
    setMessage('');
  };

  // Get tile color
  const getTileStyle = (value) => {
    if (value === 0) return { background: 'rgba(255,255,255,0.05)' };
    const colors = {
      2: '#e5e7eb',
      4: '#d1d5db',
      8: '#fbbf24',
      16: '#f59e0b',
      32: '#ea580c',
      64: '#dc2626',
      128: '#c026d3',
      256: '#7c3aed',
      512: '#2563eb',
      1024: '#0891b2',
      2048: '#059669'
    };
    return {
      background: colors[value] || '#1e40af',
      color: value <= 4 ? '#1f2937' : 'white',
      fontSize: value >= 1000 ? '1.6rem' : '2rem'
    };
  };

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/games" className="back-link">← Back to Games</Link>
        <div className="logo">Sweetest</div>
      </header>

      <main className="game2048-main">
        <h1 className="game-title">Mini 2048</h1>

        <div className="info-bar">
          <div className="score-display">
            Score: <span>{score}</span>
          </div>
          <div className="score-display">
            Best: <span>{bestScore}</span>
          </div>
        </div>

        <div className="instructions">
          <p>Use <strong>arrow keys</strong> or <strong>WASD</strong></p>
          <p>Swipe on mobile • Combine same numbers to reach 2048!</p>
        </div>

        <div
          className="board-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="board">
            {board.flat().map((value, index) => (
              <div
                key={index}
                className={`tile ${value ? 'tile-' + value : ''}`}
                style={getTileStyle(value)}
              >
                {value !== 0 && value}
              </div>
            ))}
          </div>
        </div>

        {gameOver && (
          <div className="game-over-message">
            <h2>Game Over!</h2>
            <p>{message}</p>
          </div>
        )}

        <button className="new-game-btn" onClick={startNewGame}>
          New Game
        </button>
      </main>
    </div>
  );
}