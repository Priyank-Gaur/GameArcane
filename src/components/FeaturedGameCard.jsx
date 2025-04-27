import styles from './FeaturedGameCard.module.css'

export default function FeaturedGameCard({ title, description, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.gameContent}>
        {children}
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}