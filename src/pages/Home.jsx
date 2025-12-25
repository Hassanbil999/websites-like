import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic } from 'lucide-react'
import { motion } from 'framer-motion'
import './Home.css'

const placeholders = ['Twitter', 'Figma', 'Notion', 'Spotify', 'Netflix', 'Shopify']
const recentSearches = ['Notion', 'Spotify', 'Figma']

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [placeholder, setPlaceholder] = useState(placeholders[0])
  const navigate = useNavigate()

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length
      setPlaceholder(placeholders[index])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/search/${encodeURIComponent(searchValue)}`)
    }
  }

  const handleQuickSearch = (term) => {
    navigate(`/search/${encodeURIComponent(term)}`)
  }

  return (
    <div className="home">
      <div className="home-container">
        <motion. div 
          className="hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity:  1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title-script">Websites Like... </h1>
          
          <h2 className="hero-title">
            Find your next<br />
            <span className="hero-title-gradient">digital obsession</span>
          </h2>
          
          <p className="hero-subtitle">
            The creative discovery engine for when you need an alternative, a<br />
            change, or just something fresh.
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <div className="search-input-wrapper">
                <span className="search-prefix">Websites like</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder={placeholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <button type="button" className="voice-button">
                <Mic size={20} />
              </button>
              <button type="submit" className="search-button">
                <Search size={24} />
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          className="recently-explored"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="recently-title">RECENTLY EXPLORED</h3>
          <div className="recent-searches">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="recent-search-item"
                onClick={() => handleQuickSearch(search)}
              >
                <span className="recent-dot"></span>
                <span>{search}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
