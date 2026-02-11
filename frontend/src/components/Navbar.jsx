import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setShowDropdown(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">Social</span>
        </Link>

        {user && (
          <div className="navbar-menu">
            <Link to="/" className="navbar-link">Home</Link>
            
            <div className="navbar-user">
              <button
                className="navbar-user-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="navbar-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                  ) : (
                    <span>{user.username.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className="navbar-username">{user.username}</span>
              </button>

              {showDropdown && (
                <div className="navbar-dropdown">
                  <Link
                    to={`/profile/${user.id}`}
                    className="navbar-dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="navbar-dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
