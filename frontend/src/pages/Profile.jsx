import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { userService, postService } from '../services/api'
import EditProfileModal from '../components/EditProfileModal'
import './Profile.css'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [id])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError('')
      
      const userResponse = await userService.getUser(id)
      setProfile(userResponse.data)
      
      // Fetch user's posts
      const allPosts = await postService.getPosts()
      const userPosts = allPosts.data.filter(post => post.author.id === userResponse.data.id)
      const sortedPosts = userPosts.sort((a, b) => {
        return new Date(b.created) - new Date(a.created)
      })
      setPosts(sortedPosts)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Failed to load profile. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile)
    setShowEditModal(false)
  }

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const isOwnProfile = currentUser && currentUser.id === profile?.id

  return (
    <div className="profile-layout">
      <Navbar />

      <div className="profile-container">
        {error && (
          <div className="profile-error">
            <p>{error}</p>
            <button onClick={fetchProfile} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="profile-loading">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        ) : profile ? (
          <>
            <div className="profile-header">
              <button className="back-button" onClick={() => navigate('/')}>
                ← Back
              </button>
              <div className="profile-header-content">
                <h1 className="profile-header-title">{profile.name || profile.username}</h1>
                <p className="profile-header-username">@{profile.username}</p>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-card">
                <div className="profile-cover"></div>

                <div className="profile-info">
                  <div className="profile-avatar-section">
                    <div className="profile-avatar">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt={profile.username} />
                      ) : (
                        <span>{profile.username.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    {isOwnProfile && (
                      <button
                        className="edit-profile-btn"
                        onClick={() => setShowEditModal(true)}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="profile-details">
                    <div className="profile-name-section">
                      <h2 className="profile-name">{profile.name || profile.username}</h2>
                      <p className="profile-username">@{profile.username}</p>
                    </div>

                    {profile.bio && (
                      <p className="profile-bio">{profile.bio}</p>
                    )}

                    <div className="profile-stats">
                      <div className="profile-stat">
                        <span className="stat-value">{posts.length}</span>
                        <span className="stat-label">Posts</span>
                      </div>
                      <div className="profile-stat">
                        <span className="stat-value">—</span>
                        <span className="stat-label">Joined</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-posts">
                <div className="posts-header">
                  <h3>Posts</h3>
                </div>

                {posts.length === 0 ? (
                  <div className="profile-empty">
                    <p className="empty-icon">📝</p>
                    <p>No posts yet</p>
                  </div>
                ) : (
                  <div className="posts-list">
                    {posts.map(post => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onPostUpdated={fetchProfile}
                        onPostDeleted={handlePostDeleted}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {showEditModal && isOwnProfile && (
              <EditProfileModal
                profile={profile}
                onClose={() => setShowEditModal(false)}
                onProfileUpdated={handleProfileUpdated}
              />
            )}
          </>
        ) : (
          <div className="profile-not-found">
            <p>User not found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
