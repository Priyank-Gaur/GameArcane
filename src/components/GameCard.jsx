
import styles from './GameCard.module.css'

export default function GameCard({ game }) {
  return (
    <div className={styles.card}>
      <a 
        href={game.game_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.link}
      >
        <div className={styles.imageContainer}>
          <img
            src={game.thumbnail}
            alt={game.title}
            fill="true"
            style={{ objectFit: 'cover' }}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className={styles.platform}>{game.platform}</span>
          <span className={styles.genre}>{game.genre}</span>
        </div>
        <div className={styles.info}>
          <h3>{game.title}</h3>
          <p>{game.short_description}</p>
        </div>
      </a>
    </div>
  )
}