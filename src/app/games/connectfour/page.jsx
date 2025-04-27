'use client'
import React, { useState } from 'react';
import styles from './connectfour.module.css'; 

export default function ConnectFour() {
    const ROWS = 6;
    const COLS = 7;
    const EMPTY = 0;
    const PLAYER_1 = 1;
    const PLAYER_2 = 2;
  
    const [board, setBoard] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(EMPTY)));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    // // Sound effects
    // const dropSound = useRef(new Audio('/sounds/drop.mp3'));
    // const winSound = useRef(new Audio('/sounds/win.mp3'));
    // const drawSound = useRef(new Audio('/sounds/draw.mp3'));
    // const errorSound = useRef(new Audio('/sounds/error.mp3'));
  
    // const playSound = (soundRef) => {
    //   soundRef.current.currentTime = 0;
    //   soundRef.current.play().catch(e => console.log("Audio play failed:", e));
    // };
  
    const checkWinner = (row, col) => {
      const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]
      ];
  
      return directions.some(([dx, dy]) => {
        let count = 1;
  
        // Check positive direction
        for (let i = 1; i < 4; i++) {
          const newRow = row + i * dx;
          const newCol = col + i * dy;
          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && 
              board[newRow][newCol] === currentPlayer) {
            count++;
          } else break;
        }
  
        // Check negative direction
        for (let i = 1; i < 4; i++) {
          const newRow = row - i * dx;
          const newCol = col - i * dy;
          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && 
              board[newRow][newCol] === currentPlayer) {
            count++;
          } else break;
        }
  
        return count >= 4;
      });
    };
  
    const checkDraw = () => board.every(row => row.every(cell => cell !== EMPTY));
  
    const handleClick = (col) => {
      if (gameOver) {
        setErrorMessage("Game over! Please reset to play again.");
        // playSound(errorSound);
        return;
      }
  
      // Find bottom-most empty row
      let row = -1;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) {
          row = r;
          break;
        }
      }
  
      if (row === -1) {
        setErrorMessage("This column is full! Try another one.");
        // playSound(errorSound);
        setTimeout(() => setErrorMessage(''), 2000);
        return;
      }
  
      // Update board
      const newBoard = [...board];
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setErrorMessage('');
    //   playSound(dropSound);
  
      // Check game state
      if (checkWinner(row, col)) {
        setWinner(currentPlayer);
        setGameOver(true);
        // playSound(winSound);
      } else if (checkDraw()) {
        setGameOver(true);
        // playSound(drawSound);
      } else {
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
      }
    };
  
    const resetGame = () => {
      setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(EMPTY)));
      setCurrentPlayer(PLAYER_1);
      setWinner(null);
      setGameOver(false);
      setErrorMessage('');
    };
  
    const toggleInstructions = () => setShowInstructions(!showInstructions);

  return (
    <div className={styles.container}>
      <div className={styles.gameWrapper}>
        <h1>Connect Four</h1>
        
        <div className={styles.gameInfo}>
          {!gameOver ? (
            <p>Current Player: <span className={`${styles.playerText} ${currentPlayer === PLAYER_1 ? styles.player1 : styles.player2}`}>
              Player {currentPlayer}
            </span></p>
          ) : winner ? (
            <p className={styles.winnerMessage}>
              <span className={styles.playerText}>Player {winner}</span> wins!
            </p>
          ) : (
            <p className={styles.drawMessage}>Game ended in a draw!</p>
          )}
        </div>

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <div className={styles.boardContainer}>
          <div className={styles.board}>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${styles.cell} ${cell === EMPTY ? styles.empty : 
                                cell === PLAYER_1 ? styles.player1 : styles.player2}`}
                    onClick={() => handleClick(colIndex)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={`${styles.actionButton} ${styles.howToPlay}`} onClick={toggleInstructions}>
            How to Play
          </button>
          <button className={`${styles.actionButton} ${styles.reset}`} onClick={resetGame}>
            Reset Game
          </button>
        </div>

        {showInstructions && (
          <div className={styles.instructionsModal}>
            <div className={styles.instructionsContent}>
              <h2>How to Play Connect Four</h2>
              <ol>
                <li>Players take turns dropping discs into columns</li>
                <li>The disc falls to the lowest available space</li>
                <li>First to get 4 in a row (any direction) wins</li>
                <li>Game ends in a draw if the board fills up</li>
                <li>Player 1: <span className={styles.player1}>Red</span>, Player 2: <span className={styles.player2}>Yellow</span></li>
              </ol>
              <button className={styles.closeButton} onClick={toggleInstructions}>
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}