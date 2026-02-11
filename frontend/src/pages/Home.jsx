import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PostCard from '../components/PostCard'
import { postService } from '../services/api'
import './Home.css'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await postService.getPosts()
      // Sort posts by creation date (newest first)
      const sortedPosts = response.data.sort((a, b) => {
        return new Date(b.created) - new Date(a.created)
      })
      setPosts(sortedPosts)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = () => {
    fetchPosts()
  }

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handlePostUpdated = () => {
    fetchPosts()
  }

  return (
    <div className="home-layout">
      <Navbar />

      <div className="home-container">
        <Sidebar onPostCreated={handlePostCreated} />

        <main className="home-feed">
          <div className="feed-header">
            <h1>Home</h1>
          </div>

          {error && (
            <div className="feed-error">
              <p>{error}</p>
              <button onClick={fetchPosts} className="retry-button">
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <div className="feed-loading">
              <div className="spinner"></div>
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="feed-empty">
              <p className="empty-icon">📝</p>
              <p>No posts yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onPostUpdated={handlePostUpdated}
                  onPostDeleted={handlePostDeleted}
                />
              ))}
            </div>
          )}
        </main>

        <aside className="feed-sidebar-right">
          <div className="feed-info">
            <h3>Welcome!</h3>
            <p>Share your thoughts and connect with others on our platform.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Home
