'use client'
import {useEffect, useRef, useState} from 'react'
import './mazerunner.module.css'

export default function MazeRunner() {
  const canvasRef = useRef(null)
  const tileSize = 40
  const [level,setLevel]=useState(0)
  const [player,setPlayer]=useState({x:0,y:0})

  const mazes=[
    [ // Level 1 (Easy)
      [0,1,0,0,0,1,0,0,1,0],
      [0,1,0,1,0,1,0,1,1,0],
      [0,0,0,1,0,0,0,0,0,0],
      [1,1,0,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0,1,0],
      [0,1,1,1,1,1,1,0,1,0],
      [0,1,0,0,0,0,1,0,0,0],
      [0,1,0,1,1,0,1,1,1,1],
      [0,0,0,1,0,0,0,0,0,0],
      [1,1,0,1,0,1,1,1,1,2]
    ],
    [ // Level 2 (Moderate, New)
        [0,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,0,0,0,0,1],
        [1,1,1,0,1,0,1,1,0,1],
        [1,0,1,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,1,0,1,0,1],
        [1,1,1,1,0,1,0,1,0,1],
        [1,0,0,0,0,1,0,1,0,1],
        [1,0,1,1,1,1,0,1,0,0],
        [1,1,1,1,1,1,0,1,1,2]
      ],
    [ // Level 3 (Tricky)
      [0,0,0,1,1,1,1,1,1,1],
      [1,1,0,1,0,0,0,0,0,1],
      [1,1,0,1,0,1,1,1,0,1],
      [1,1,0,1,0,1,0,0,0,1],
      [1,1,0,1,0,1,0,1,1,1],
      [1,1,0,0,0,1,0,1,0,0],
      [1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,2]
    ],
    [ // Level 4 (Hard)
      [0,1,1,1,1,1,1,1,1,1],
      [0,0,0,0,0,1,0,0,0,1],
      [1,1,1,1,0,1,0,1,0,1],
      [1,0,0,1,0,1,0,1,0,1],
      [1,0,1,1,0,0,0,1,0,1],
      [1,0,1,0,1,1,1,1,0,1],
      [1,0,1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,0],
      [1,1,1,1,1,1,0,1,1,2]
    ],
    [ // Level 5 (Insane)
      [0,1,1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,0,1,0,1],
      [1,0,1,0,0,1,0,1,0,1],
      [1,0,1,0,1,1,0,1,0,1],
      [1,0,1,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,0,0],
      [1,0,0,0,0,0,0,0,1,2]
    ]
  ]

  const maze = mazes[level]
  const rows = maze.length
  const cols = maze[0].length

  useEffect(() => {
    drawMaze()
    drawPlayer()
  }, [player,level])

  const drawMaze = () => {
    const ctx = canvasRef.current.getContext('2d')
    for (let y=0; y<rows; y++) {
      for (let x=0; x<cols; x++) {
        ctx.fillStyle=maze[y][x]===1?'#333':maze[y][x]===2?'#00ff88':'#f0f0f0'
        ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize)
      }
    }
  }

  const drawPlayer = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle='#ff4444'
    ctx.beginPath()
    ctx.arc(player.x*tileSize+tileSize/2,player.y*tileSize+tileSize/2,tileSize/3,0,Math.PI*2)
    ctx.fill()
  }

  const move = dir => {
    const {x,y}=player
    const d={
      ArrowUp:[x,y-1],
      ArrowDown:[x,y+1],
      ArrowLeft:[x-1,y],
      ArrowRight:[x+1,y]
    }
    const [nx,ny]=d[dir]||[x,y]
    if(maze[ny]?.[nx]!==undefined&&maze[ny][nx]!==1){
      setPlayer({x:nx,y:ny})
      if(maze[ny][nx]===2){
        setTimeout(()=>{
          if(level<mazes.length-1){
            alert(`🎉 Level ${level+1} complete! Moving to Level ${level+2}`)
            setLevel(level+1)
            setPlayer({x:0,y:0})
          }else{
            alert('🏆 All levels complete!')
            setLevel(0)
            setPlayer({x:0,y:0})
          }
        },100)
      }
    }
  }

  useEffect(()=>{
    const handler=e=>move(e.key)
    window.addEventListener('keydown',handler)
    return()=>window.removeEventListener('keydown',handler)
  },[player,level])

  return (
    <div className="maze-container">
      <h1>🌀 Maze Runner - Level {level+1}</h1>
      <canvas ref={canvasRef} width={cols*tileSize} height={rows*tileSize} className="maze-canvas"/>
      <p>Use arrow keys to move. Get to the <span style={{color:'#00ff88'}}>green goal</span>!</p>
    </div>
  )
}
