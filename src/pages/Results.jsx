import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Filter, Grid3x3, Layers, Heart, Share2, ExternalLink, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Results.css'

const mockWebsites = [
  {
    id: 1,
    name: 'Bluesky',
    tagline: 'Social media as it should be',
    logo: 'B',
    gradient: 'linear-gradient(135deg, #0090FF 0%, #0070DD 100%)',
    category: 'SOCIAL',
    features: ['Decentralized', 'Open Source', 'Microblogging'],
    pricing: 'free',
    pricingLabel: 'Grows on Trees',
    pricingIcon: '🌳',
    similarity: 'IDENTICAL TWIN',
    rating: 4.8,
    reviews: 1240,
    url: 'https://bluesky.app'
  },
  {
    id: 2,
    name: 'Mastodon',
    tagline: "Social networking that's not for sale",
    logo: 'M',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    category: 'SOCIAL',
    features: ['Federated', 'Privacy', 'Community'],
    pricing: 'free',
    pricingLabel:  'Grows on Trees',
    pricingIcon:  '🌳',
    similarity: 'SIBLING',
    rating: 4.5,
    reviews: 3500,
    url: 'https://joinmastodon.org'
  },
  {
    id:  3,
    name: 'Threads',
    tagline: 'Say more with Threads',
    logo: 'T',
    gradient: 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)',
    category: 'SOCIAL',
    features: ['Meta', 'Instagram', 'Conversations'],
    pricing: 'free',
    pricingLabel:  'Grows on Trees',
    pricingIcon: '🌳',
    similarity: 'SIBLING',
    rating: 4.2,
    reviews: 8900,
    url: 'https://threads.net'
  },
  {
    id: 4,
    name: 'Tumblr',
    tagline:  'Explore your interests',
    logo: 'T',
    gradient: 'linear-gradient(135deg, #35465C 0%, #1C2938 100%)',
    category: 'SOCIAL',
    features: ['Blogging', 'Community', 'Creative'],
    pricing: 'freemium',
    pricingLabel: 'Free Taste, Premium Feast',
    pricingIcon:  '☕',
    similarity: 'COUSIN',
    rating: 4.1,
    reviews: 2100,
    url: 'https://tumblr.com'
  },
  {
    id: 5,
    name:  'Post',
    tagline: 'News without the noise',
    logo: 'P',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)',
    category: 'SOCIAL',
    features: ['News', 'Journalism', 'Creator Economy'],
    pricing: 'freemium',
    pricingLabel: 'Free Taste, Premium Feast',
    pricingIcon: '☕',
    similarity: 'COUSIN',
    rating: 4.0,
    reviews: 890,
    url: 'https://post.news'
  }
]

const Results = () => {
  const { query } = useParams()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('carousel')
  const [selectedCard, setSelectedCard] = useState(null)

  return (
    <div className="results">
      <div className="results-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          <span>Back to Search</span>
        </button>

        <div className="results-title-section">
          <h1 className="results-title">
            Websites like <span className="query-highlight">"{query}"</span>
          </h1>
          <p className="results-count">{mockWebsites.length} alternatives found</p>
        </div>

        <div className="view-controls">
          <button className="filter-button">
            <Filter size={20} />
          </button>
          <div className="view-toggle">
            <button 
              className={`view-button ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
            >
              <Layers size={20} />
            </button>
            <button 
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="results-content">
        {viewMode === 'carousel' ?  (
          <CarouselView 
            websites={mockWebsites} 
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ) : (
          <GridView websites={mockWebsites} />
        )}
      </div>
    </div>
  )
}

const CarouselView = ({ websites, selectedCard, setSelectedCard }) => {
  return (
    <div className="carousel-view">
      <AnimatePresence>
        {selectedCard !== null ?  (
          <motion.div 
            className="card-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <WebsiteCard 
              website={websites[selectedCard]} 
              isExpanded={true}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        ) : (
          <div className="carousel-container">
            {websites.map((website, index) => (
              <motion.div
                key={website.id}
                className="carousel-card-wrapper"
                style={{ zIndex: websites.length - Math.abs(index - 0) }}
                initial={{ opacity: 0, x: index * 50 }}
                animate={{ opacity:  1, x: index * 30 }}
                transition={{ delay:  index * 0.1 }}
              >
                <WebsiteCard 
                  website={website} 
                  onClick={() => setSelectedCard(index)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const GridView = ({ websites }) => {
  return (
    <div className="grid-view">
      {websites.map((website, index) => (
        <motion.div
          key={website. id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:  index * 0.1 }}
        >
          <WebsiteCard website={website} />
        </motion.div>
      ))}
    </div>
  )
}

const WebsiteCard = ({ website, isExpanded, onClick }) => {
  return (
    <motion.div 
      className={`website-card ${isExpanded ? 'expanded' : ''}`}
      style={{ background: website.gradient }}
      onClick={onClick}
      whileHover={{ scale: isExpanded ? 1 : 1.02, y: isExpanded ? 0 : -5 }}
      transition={{ duration:  0.3 }}
    >
      <div className="card-header">
        <div className="card-logo">{website.logo}</div>
        <div className="similarity-badge">{website.similarity}</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{website.name}</h3>
        <p className="card-tagline">{website.tagline}</p>

        <div className="card-features">
          {website.features. map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>

        <div className="pricing-badge">
          <span className="pricing-icon">{website.pricingIcon}</span>
          <span className="pricing-label">{website. pricingLabel}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="visit-button">
          Visit Site <ExternalLink size={18} />
        </button>
        
        <div className="action-buttons">
          <button className="icon-button">
            <Heart size={20} />
          </button>
          <button className="icon-button">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="card-footer">
        <div className="rating">
          <Star size={16} fill="currentColor" />
          <span>{website.rating}</span>
          <span className="review-count">({website.reviews})</span>
        </div>
        <div className="category">{website.category}</div>
      </div>
    </motion.div>
  )
}

export default Results
