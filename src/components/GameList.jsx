import GameCard from './GameCard'
import styles from './GameList.module.css'

export default function GameList({ games, loading }) {
  if (loading) {
    return (
      <div className={styles.loadingGrid}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {games?.length > 0 ? (
        games.map((game) => <GameCard key={game.id} game={game} />)
      ) : (
        <div className={styles.noResults}>
          No games found matching your filters
        </div>
      )}
    </div>
  )
}