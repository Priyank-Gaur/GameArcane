'use client'
import {useEffect, useState} from 'react'
import './countdown.module.css'

const words=['react','javascript','coding','challenge','timer','component','function','state','hook']

export default function CountdownChallenge(){
  const [currentWord,setCurrentWord]=useState('')
  const [input,setInput]=useState('')
  const [timeLeft,setTimeLeft]=useState(5)
  const [score,setScore]=useState(0)
  const [gameOver,setGameOver]=useState(false)

  const getRandomWord=()=>words[Math.floor(Math.random()*words.length)]

  useEffect(()=>{
    setCurrentWord(getRandomWord())
  },[])

  useEffect(()=>{
    if(gameOver)return
    if(timeLeft===0){
      setGameOver(true)
      return
    }
    const timer=setTimeout(()=>setTimeLeft(t=>t-1),1000)
    return ()=>clearTimeout(timer)
  },[timeLeft,gameOver])

  const handleChange=e=>{
    setInput(e.target.value)
    if(e.target.value===currentWord){
      const newWord=getRandomWord()
      setCurrentWord(newWord)
      setInput('')
      setScore(s=>s+1)
      setTimeLeft(5)
    }
  }

  const resetGame=()=>{
    setScore(0)
    setInput('')
    setCurrentWord(getRandomWord())
    setTimeLeft(5)
    setGameOver(false)
  }

  return(
    <div className="container">
      <h1>⏳ Countdown Challenge</h1>
      {gameOver?(
        <>
          <h2>Game Over!</h2>
          <p>Your Score: <strong>{score}</strong></p>
          <button onClick={resetGame}>Restart</button>
        </>
      ):(
        <>
          <p className="word">{currentWord}</p>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Type the word..."
            autoFocus
          />
          <p className="timer">Time Left: {timeLeft}s</p>
          <p className="score">Score: {score}</p>
        </>
      )}
    </div>
  )
}
