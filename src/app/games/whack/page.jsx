'use client'
import {useEffect, useState} from 'react'
import styles from './whack.module.css'

const GRID_SIZE = 3
const TOTAL_TIME = 30

export default function WhackAMole() {
  const [moleIndex, setMoleIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    if (gameOver) return
    const moleTimer = setInterval(() => {
      const next = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE)
      setMoleIndex(next)
    }, 800)
    return () => clearInterval(moleTimer)
  }, [gameOver])

  const whack = (index) => {
    if (gameOver) return
    if (index === moleIndex) {
      setScore(score + 1)
      setMoleIndex(null)
    }
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(TOTAL_TIME)
    setGameOver(false)
    setMoleIndex(null)
  }

  const cells = Array.from({length: GRID_SIZE * GRID_SIZE}, (_, i) => (
    <div
      key={i}
      className={`${styles.cell} ${i === moleIndex ? styles.mole : ''}`}
      onClick={() => whack(i)}
    />
  ))

  return (
    <div className={styles.container}>
      <h1>Whack-a-Mole</h1>
      <div className={styles.info}>
        <span>⏱️ Time: {timeLeft}</span>
        <span>🏆 Score: {score}</span>
      </div>
      <div className={styles.grid}>{cells}</div>
      {gameOver && <h2 className={styles.gameover}>Game Over! Final Score: {score}</h2>}
      <button onClick={resetGame} className={styles.button}>Restart</button>
    </div>
  )
}
