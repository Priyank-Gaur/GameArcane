'use client';

import { useState, useEffect } from 'react';
import styles from './TicTacToe.module.css';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => (
    <button
      className={`${styles.square} ${board[index] ? styles[board[index].toLowerCase()] : ''}`}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const status = winner
    ? `Winner: ${winner}`
    : board.every(square => square)
    ? 'Game Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className={styles.game}>
      <h2 className={styles.title}>Tic Tac Toe</h2>
      <div className={styles.status}>{status}</div>
      <div className={styles.board}>
        <div className={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

