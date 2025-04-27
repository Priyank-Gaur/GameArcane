import styles from './page.module.css'
import Link from 'next/link'
import Footer from "../components/footer"

export default function Home() {
  return (
    <>
      <main className={styles.home}>
        <div className={styles.videoContainer}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
          >
            <source src="/videos/mainbackwall.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.videoOverlay}></div>
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>🎮 GameArcane</h1>
          <div className={styles.buttons}>
            <Link href="/explore"><button className={styles.button}>🔥 Explore Games</button></Link>
            <Link href="/collection"><button className={styles.button}>🎮 My Collection</button></Link>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  )
}