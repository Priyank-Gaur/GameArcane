'use client'
import { useState, useEffect } from 'react'
import GameList from '../../components/GameList'
import GameFilters from '../../components/GameFilters'
import styles from './explore.module.css'
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"


export default function ExplorePage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    platform: 'all',
    sortBy: 'relevance'
  })

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true)
        let url = '/api/games?'
        if (filters.category) url += `category=${filters.category}&`
        if (filters.platform !== 'all') url += `platform=${filters.platform}&`
        url += `sort-by=${filters.sortBy}`

        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch games')
        const data = await res.json()
        setGames(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  if (loading) return <div className={styles.loading}>Loading games...</div>
  if (error) return <div className={styles.error}>⚠️ Error: {error}</div>

  return (
    <>
    <Navbar/>
    <main className={styles.container}>
      <h1>🔥 Explore Games</h1>
      <GameFilters 
        filters={filters} 
        onChange={handleFilterChange} 
      />
      <GameList games={games} loading={loading} />
    </main>
    <Footer/>
    </>
  )
}