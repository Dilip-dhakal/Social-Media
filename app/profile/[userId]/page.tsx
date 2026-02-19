'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { PostCard } from '@/components/post/PostCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { User, userService } from '@/lib/services/user.service'
import { Post, postService } from '@/lib/services/post.service'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/Button'

export default function UserProfilePage() {
  const router = useRouter()
  const params = useParams()
  const userId = Number(params.userId)
  const { isAuthenticated, checkAuth, user: currentUser } = useAuthStore()

  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    const fetchUserData = async () => {
      setIsLoading(true)
      setError('')
      try {
        const userData = await userService.getUserById(userId)
        setUser(userData)

        // Fetch posts by this user
        const allPosts = await postService.getAllPosts()
        const userPosts = allPosts.filter((p) => p.author.id === userId)
        setPosts(userPosts)
      } catch (err: any) {
        setError('Failed to load user profile.')
        console.error('Error fetching user:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId, isAuthenticated, router])

  const handleDeletePost = async (postId: number) => {
    try {
      await postService.deletePost(postId)
      setPosts(posts.filter((p) => p.id !== postId))
    } catch (err: any) {
      console.error('Error deleting post:', err)
    }
  }

  const handleLikePost = async (postId: number) => {
    try {
      const post = posts.find((p) => p.id === postId)
      if (!post) return

      if (post.is_liked) {
        await postService.unlikePost(postId)
      } else {
        await postService.likePost(postId)
      }

      const updated = await postService.getPostById(postId)
      setPosts(posts.map((p) => (p.id === postId ? updated : p)))
    } catch (err: any) {
      console.error('Error liking post:', err)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    )
  }

  if (error || !user) {
    return (
      <MainLayout>
        <ErrorMessage message={error || 'User not found'} />
        <Link href="/" className="text-accent hover:underline">
          Back to feed
        </Link>
      </MainLayout>
    )
  }

  const isOwnProfile = currentUser?.id === user.id

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-6">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">{user.username}</h1>
                <p className="text-secondary mb-3">{user.email}</p>
                {user.bio && (
                  <p className="text-primary max-w-md">{user.bio}</p>
                )}
              </div>
            </div>

            {isOwnProfile && (
              <Link href={`/profile/${user.id}/edit`}>
                <Button variant="secondary">Edit Profile</Button>
              </Link>
            )}
          </div>

          <div className="flex gap-8 pt-4 border-t border-border-color mt-4">
            <div>
              <p className="text-2xl font-bold text-primary">{posts.length}</p>
              <p className="text-secondary">Posts</p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Posts</h2>
          {posts.length === 0 ? (
            <div className="text-center py-12 card">
              <p className="text-secondary">{isOwnProfile ? 'You' : user.username} has not posted yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onDelete={isOwnProfile ? handleDeletePost : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
