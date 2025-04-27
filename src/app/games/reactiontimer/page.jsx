'use client';
import React, { useState, useEffect } from 'react';

import styles from './ReactionTimer.module.css';

export default function ReactionTimer() {
  const [gameState, setGameState] = useState('waiting'); // waiting, ready, clicked
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [averageTime, setAverageTime] = useState(null);

  useEffect(() => {
    if (gameState === 'ready') {
      const changeTime = Math.random() * 4000 + 1000; // Random time between 1-5 seconds
      const timeout = setTimeout(() => {
        setStartTime(Date.now());
        setGameState('clicking');
      }, changeTime);

      return () => clearTimeout(timeout);
    }
  }, [gameState]);

  useEffect(() => {
    if (attempts.length === 5) {
      const average = attempts.reduce((a, b) => a + b, 0) / attempts.length;
      setAverageTime(average);
    }
  }, [attempts]);

  const handleStart = () => {
    setGameState('ready');
    setReactionTime(null);
  };

  const handleClick = () => {
    if (gameState === 'clicking') {
      const endTime = Date.now();
      const newReactionTime = endTime - startTime;
      setReactionTime(newReactionTime);
      setAttempts(prev => [...prev, newReactionTime]);
      setGameState('waiting');
    } else if (gameState === 'ready') {
      setGameState('waiting');
      setReactionTime('Too early!');
    }
  };

  const resetGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    setAttempts([]);
    setAverageTime(null);
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'waiting':
        return styles.waiting;
      case 'ready':
        return styles.ready;
      case 'clicking':
        return styles.clicking;
      default:
        return styles.waiting;
    }
  };

  return (
    <div className={styles.game}>
      <h2 className={styles.title}>Reaction Timer</h2>
      <div 
        className={`${styles.gameArea} ${getBackgroundColor()}`}
        onClick={handleClick}
      >
        {gameState === 'waiting' && (
          <button className={styles.startButton} onClick={handleStart}>
            Start Game
          </button>
        )}
        {gameState === 'ready' && <p>Wait for green...</p>}
        {gameState === 'clicking' && <p>Click Now!</p>}
      </div>

      {reactionTime && (
        <div className={styles.result}>
          <p>Reaction Time: {typeof reactionTime === 'number' ? `${reactionTime}ms` : reactionTime}</p>
        </div>
      )}

      {attempts.length > 0 && (
        <div className={styles.attempts}>
          <h3>Previous Attempts:</h3>
          <ul>
            {attempts.map((time, index) => (
              <li key={index}>{time}ms</li>
            ))}
          </ul>
        </div>
      )}

      {averageTime && (
        <div className={styles.average}>
          <p>Average Time: {averageTime.toFixed(2)}ms</p>
        </div>
      )}

      {attempts.length > 0 && (
        <button className={styles.resetButton} onClick={resetGame}>
          Reset Game
        </button>
      )}
    </div>
  );
};

