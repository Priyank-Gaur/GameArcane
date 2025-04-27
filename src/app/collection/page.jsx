'use client'
import Image from 'next/image'
import tictactoeImage from './tictactoe.png'
import game2048 from './2048.png';
import reaction from './reactiontimer.png';
import maze from './maze.png';
import mine from './minesweeper.png';
import whack from './whack.png';
import typeit from './type.png';
import connect from './connect.png'
import Link from 'next/link'
import styles from './page.module.css'
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"

const games = [
  {
    title: '2048',
    slug: '2048',
    description: 'Play with numbers.',
    image: game2048
  },
  {
    title: 'Connect 4',
    slug: "connectfour",
    description: 'First to get 4 discs in a row (horizontally, vertically, or diagonally) wins',
    image: connect
  },
  {
    title: 'Tic Tac Toe',
    slug: 'tictactoe',
    description: 'Classic Xs and Os game.',
    image: tictactoeImage
  },
  {
    title: 'Reaction Timer',
    slug: 'reactiontimer',
    description: 'Test your reflexes.',
    image: reaction
  },
  {
    title: 'Maze Runner',
    slug: "mazerunner",
    description: 'Navigate through the challenging maze to win!',
    image: maze
  },
  {
    title: 'Mine STAKE!',
    slug: "minesweeper",
    description: 'Click cells in a grid to reveal safe spots or bombs',
    image: mine
  },
  {
    title: 'Catch Me!',
    slug: "whack",
    description: 'Click on the randomly appearing mole in a grid ',
    image: whack
  },
  {
    title: 'I am SPEED!',
    slug: "countdown",
    description: 'Type a given word correctly before time runs out',
    image: typeit
  }

]

export default function CollectionPage() {
  return (
    <>
    <Navbar/>
    <main className={styles.container}>
      <h1>🎮 My Game Collection</h1>
      <div className={styles.grid}>
        {games.map(game => (
          <div key={game.slug} className={styles.card}>
            <Image src={game.image} alt={game.title} style={{ objectFit: 'contain' }} className={styles.thumbnail} width={50000} height={10000} />
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <Link href={`/games/${game.slug}`}>
              <button className={styles.playButton}>Play Now</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
    <Footer/>
    </>
  )
}
