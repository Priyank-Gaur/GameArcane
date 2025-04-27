'use client'
import { useState, useEffect } from 'react'
import styles from './Game2048.module.css'

export default function Game2048() {
  const [board, setBoard] = useState(Array(4).fill().map(() => Array(4).fill(0)))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // Initialize board
  useEffect(() => {
    initializeBoard()
  }, [])

  const initializeBoard = () => {
    const newBoard = Array(4).fill().map(() => Array(4).fill(0))
    addNewTile(newBoard)
    addNewTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
  }

  const addNewTile = (currentBoard) => {
    const emptyCells = []
    currentBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push([i, j])
      })
    })
    if (emptyCells.length > 0) {
      const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      currentBoard[i][j] = Math.random() < 0.9 ? 2 : 4
    }
  }

  const moveBoard = (direction) => {
    if (gameOver) return

    let newBoard = JSON.parse(JSON.stringify(board))
    let moved = false
    let newScore = score

    // Rotate board according to direction
    if (direction === 'left') {
      // No rotation needed
    } else if (direction === 'right') {
      newBoard = newBoard.map(row => row.reverse())
    } else if (direction === 'up') {
      newBoard = newBoard[0].map((_, i) => newBoard.map(row => row[i]))
    } else if (direction === 'down') {
      newBoard = newBoard[0].map((_, i) => newBoard.map(row => row[i]).reverse())
    }

    // Move and merge tiles
    newBoard = newBoard.map(row => {
      let newRow = row.filter(cell => cell !== 0)
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2
          newScore += newRow[i]
          newRow.splice(i + 1, 1)
          moved = true
        }
      }
      while (newRow.length < 4) newRow.push(0)
      return newRow
    })

    // Rotate back
    if (direction === 'right') {
      newBoard = newBoard.map(row => row.reverse())
    } else if (direction === 'up') {
      newBoard = newBoard[0].map((_, i) => newBoard.map(row => row[i]))
    } else if (direction === 'down') {
      newBoard = newBoard[0].map((_, i) => newBoard.map(row => row[i]).reverse())
    }

    // Check if board changed
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
      moved = true
      addNewTile(newBoard)
    }

    setBoard(newBoard)
    setScore(newScore)

    // Check game over
    if (!canMove(newBoard)) {
      setGameOver(true)
    }
  }

  const canMove = (currentBoard) => {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) return true
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j] === currentBoard[i][j + 1]) return true
        if (currentBoard[j][i] === currentBoard[j + 1][i]) return true
      }
    }

    return false
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          moveBoard('left')
          break
        case 'ArrowRight':
          moveBoard('right')
          break
        case 'ArrowUp':
          moveBoard('up')
          break
        case 'ArrowDown':
          moveBoard('down')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [board, score, gameOver])

  return (
    <div className={styles.game2048}>
      <div className={styles.header}>
        <div className={styles.score}>Score: {score}</div>
        <button onClick={initializeBoard} className={styles.newGameBtn}>New Game</button>
      </div>
      <div className={styles.board}>
        {board.map((row, i) => (
          <div key={i} className={styles.row}>
            {row.map((cell, j) => (
              <div key={`${i}-${j}`} className={`${styles.cell} ${styles[`tile${cell}`]}`}>
                {cell !== 0 && cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className={styles.gameOver}>
          Game Over!
          <button onClick={initializeBoard} className={styles.retryBtn}>Try Again</button>
        </div>
      )}
    </div>
  )
}