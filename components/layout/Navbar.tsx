'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export const Navbar = () => {
  const router = useRouter()
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="bg-card-bg border-b border-border-color sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-accent">
            SocialHub
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-secondary hover:text-primary transition">
              Feed
            </Link>
            {user && (
              <Link href={`/profile/${user.id}`} className="text-secondary hover:text-primary transition">
                Profile
              </Link>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-bg hover:bg-gray-100 transition"
            >
              <span className="text-primary font-medium">{user?.username}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 card shadow-lg">
                <div className="p-4">
                  <p className="text-sm text-secondary mb-4">{user?.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 hover:text-red-700 font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
