'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading, error } = useAuthStore()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [validationError, setValidationError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError('')

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setValidationError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters')
      return
    }

    try {
      await register(formData.username, formData.email, formData.password)
      router.push('/')
    } catch (err) {
      console.error('Registration error:', err)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-light-bg">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">Create Account</h1>
        <p className="text-secondary text-center mb-6">Join our social media community</p>

        {(error || validationError) && (
          <ErrorMessage message={error || validationError} />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="username"
            placeholder="Choose a username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Create a password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-secondary mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-accent font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
