import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-dot"></span>
          <span className="logo-text">Websites Like... </span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/categories" className="navbar-link">Categories</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <button className="navbar-button">Submit Site</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
