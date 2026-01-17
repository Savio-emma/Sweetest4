// RockPaperScissors.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Rock.css';

export default function RockPaperScissors() {
  const [round, setRound] = useState(1);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [result, setResult] = useState('');
  const [userHistory, setUserHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastAiChoice, setLastAiChoice] = useState(null);

  const choices = [
    { name: 'rock', emoji: '🪨' },
    { name: 'paper', emoji: '📄' },
    { name: 'scissors', emoji: '✂️' }
  ];

  const audioCtxRef = useRef(null);

  const playSound = (frequency, duration, type = 'sine') => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = frequency;
    osc.type = type;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const getAIChoice = () => {
    if (userHistory.length < 3) {
      return choices[Math.floor(Math.random() * 3)].name;
    }

    const recent = userHistory.slice(-5);
    const counts = { rock: 0, paper: 0, scissors: 0 };
    recent.forEach(c => counts[c]++);
    
    let mostCommon = 'rock';
    if (counts.paper > counts[mostCommon]) mostCommon = 'paper';
    if (counts.scissors > counts[mostCommon]) mostCommon = 'scissors';

    // Counter to most frequent recent choice
    const counters = { rock: 'paper', paper: 'scissors', scissors: 'rock' };
    return counters[mostCommon];
  };

  const determineWinner = (user, ai) => {
    if (user === ai) return 'tie';
    if (
      (user === 'rock' && ai === 'scissors') ||
      (user === 'paper' && ai === 'rock') ||
      (user === 'scissors' && ai === 'paper')
    ) {
      return 'user';
    }
    return 'ai';
  };

  const playRound = (userChoice) => {
    if (round > 10 || gameOver) return;

    const aiChoice = getAIChoice();
    setLastAiChoice(aiChoice);
    setUserHistory(prev => [...prev.slice(-9), userChoice]); // keep last 10

    const winner = determineWinner(userChoice, aiChoice);

    if (winner === 'user') {
      setUserScore(prev => prev + 1);
      setResult(`You Win! 🎉 ${choices.find(c => c.name === userChoice).emoji} beats ${choices.find(c => c.name === aiChoice).emoji}`);
      playSound(820, 0.22, 'triangle');
    } else if (winner === 'ai') {
      setAiScore(prev => prev + 1);
      setResult(`AI Wins 🤖 ${choices.find(c => c.name === aiChoice).emoji} beats ${choices.find(c => c.name === userChoice).emoji}`);
      playSound(280, 0.18, 'sawtooth');
    } else {
      setResult(`Tie! 🤝 Both chose ${choices.find(c => c.name === userChoice).emoji}`);
      playSound(520, 0.15);
    }

    if (round === 10) {
      setGameOver(true);
    } else {
      setRound(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setRound(1);
    setUserScore(0);
    setAiScore(0);
    setResult('');
    setUserHistory([]);
    setGameOver(false);
    setLastAiChoice(null);
  };

  const getGameResultMessage = () => {
    if (userScore > aiScore) return '🏆 You Won the Match! 🏆';
    if (aiScore > userScore) return '🤖 AI Won the Match 🤖';
    return '🤝 Draw Match! 🤝';
  };

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/games" className="back-link">
          ← Back to Games
        </Link>
        <div className="logo">Sweetest</div>
      </header>

      <main className="rps-main">
        <h1 className="rps-title">Rock Paper Scissors</h1>
        <p className="subtitle">Best of 10 • AI adapts to your style</p>

        <div className="round-info">
          Round <span className="round-number">{round}/10</span>
        </div>

        <div className="score-board">
          <div className="score player">
            You: <span>{userScore}</span>
          </div>
          <div className="vs">VS</div>
          <div className="score ai">
            AI: <span>{aiScore}</span>
          </div>
        </div>

        {result && <div className="result-message">{result}</div>}

        {!gameOver ? (
          <div className="choices-container">
            {choices.map(choice => (
              <button
                key={choice.name}
                className="choice-btn"
                onClick={() => playRound(choice.name)}
                disabled={gameOver}
                aria-label={`Choose ${choice.name}`}
              >
                {choice.emoji}
                <span className="choice-label">{choice.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="game-over">
            <h2>{getGameResultMessage()}</h2>
            <button className="rematch-btn" onClick={resetGame}>
              Rematch
            </button>
          </div>
        )}

        <button className="new-match-btn" onClick={resetGame}>
          New Match
        </button>
      </main>
    </div>
  );
}