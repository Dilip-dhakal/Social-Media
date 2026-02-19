'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error } = useAuthStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [validationError, setValidationError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError('')

    if (!formData.email || !formData.password) {
      setValidationError('Please fill in all fields')
      return
    }

    try {
      await login(formData.email, formData.password)
      router.push('/')
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-light-bg">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">Sign In</h1>
        <p className="text-secondary text-center mb-6">Welcome back to your social media</p>

        {(error || validationError) && (
          <ErrorMessage message={error || validationError} />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter your password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-secondary mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-accent font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  )
}
