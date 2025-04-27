'use client'
import styles from './GameFilters.module.css'

const categories = [
  'mmorpg', 'shooter', 'strategy', 'moba', 
  'racing', 'sports', 'social', 'sandbox',
  'open-world', 'survival', 'pvp', 'pve',
  'pixel', 'voxel', 'zombie', 'turn-based',
  'first-person', 'third-Person', 'top-down',
  'tank', 'space', 'sailing', 'side-scroller',
  'superhero', 'permadeath', 'card', 'battle-royale',
  'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime',
  'fantasy', 'sci-fi', 'fighting', 'action-rpg',
  'action', 'military', 'martial-arts', 'flight',
  'low-spec', 'tower-defense', 'horror', 'mmorts'
]

const platforms = ['all', 'pc', 'browser']
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'release-date', label: 'Release Date' },
  { value: 'alphabetical', label: 'A-Z' }
]

export default function GameFilters({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="category">Genre:</label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Genres</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="platform">Platform:</label>
        <select
          id="platform"
          name="platform"
          value={filters.platform}
          onChange={handleChange}
        >
          {platforms.map(platform => (
            <option key={platform} value={platform}>
              {platform === 'all' ? 'All Platforms' : platform.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}