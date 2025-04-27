'use client'
import {useState, useEffect} from 'react'
import styles from './minesweeper.module.css'

const generateBoard = (rows, cols, bombs) => {
  const board = Array.from({length: rows}, () =>
    Array.from({length: cols}, () => ({
      revealed: false,
      bomb: false,
      flag: false,
      adjacent: 0
    }))
  )

  let placed = 0
  while (placed < bombs) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)
    if (!board[r][c].bomb) {
      board[r][c].bomb = true
      placed++
    }
  }

  const directions = [-1, 0, 1]
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].bomb) continue
      let count = 0
      for (let dr of directions) {
        for (let dc of directions) {
          if (dr === 0 && dc === 0) continue
          const nr = r + dr
          const nc = c + dc
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            board[nr][nc].bomb
          ) {
            count++
          }
        }
      }
      board[r][c].adjacent = count
    }
  }

  return board
}

export default function MinesweeperLite() {
  const rows = 8
  const cols = 8
  const bombs = 10
  const [board, setBoard] = useState(() => generateBoard(rows, cols, bombs))
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)

  const revealCell = (r, c) => {
    if (board[r][c].revealed || board[r][c].flag || gameOver) return

    const newBoard = board.map(row => row.map(cell => ({...cell})))
    const stack = [[r, c]]

    while (stack.length) {
      const [cr, cc] = stack.pop()
      const cell = newBoard[cr][cc]
      if (cell.revealed || cell.flag) continue
      cell.revealed = true

      if (cell.bomb) {
        setGameOver(true)
        return
      }

      if (cell.adjacent === 0) {
        for (let dr of [-1, 0, 1]) {
          for (let dc of [-1, 0, 1]) {
            const nr = cr + dr
            const nc = cc + dc
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              !newBoard[nr][nc].revealed
            ) {
              stack.push([nr, nc])
            }
          }
        }
      }
    }

    setBoard(newBoard)
    checkWin(newBoard)
  }

  const checkWin = (b) => {
    const allSafeRevealed = b.every(row =>
      row.every(cell =>
        (cell.bomb && !cell.revealed) || (!cell.bomb && cell.revealed)
      )
    )
    if (allSafeRevealed) {
      setWin(true)
      setGameOver(true)
    }
  }

  const toggleFlag = (e, r, c) => {
    e.preventDefault()
    if (gameOver || board[r][c].revealed) return
    const newBoard = board.map(row => row.map(cell => ({...cell})))
    newBoard[r][c].flag = !newBoard[r][c].flag
    setBoard(newBoard)
  }

  const resetGame = () => {
    setBoard(generateBoard(rows, cols, bombs))
    setGameOver(false)
    setWin(false)
  }

  return (
    <div className={styles.container}>
      <h1>Minesweeper Lite</h1>
      {gameOver && (
        <h2 className={win ? styles.win : styles.lose}>
          {win ? '🎉 You Win!' : '💥 Game Over'}
        </h2>
      )}
      <div className={styles.board}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`${styles.cell} ${cell.revealed ? styles.revealed : ''} ${
                cell.flag ? styles.flag : ''
              }`}
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
            >
              {cell.revealed
                ? cell.bomb
                  ? '💣'
                  : cell.adjacent > 0
                  ? cell.adjacent
                  : ''
                : cell.flag
                ? '🚩'
                : ''}
            </div>
          ))
        )}
      </div>
      <button onClick={resetGame} className={styles.reset}>Restart</button>
    </div>
  )
}
