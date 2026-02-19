'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/lib/services/post.service'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { ErrorMessage } from '@/components/ErrorMessage'

interface PostFormProps {
  initialPost?: Post
  onSubmit: (data: { title: string; content: string }) => Promise<void>
  onCancel?: () => void
}

export const PostForm: React.FC<PostFormProps> = ({
  initialPost,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: initialPost?.title || '',
    content: initialPost?.content || '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error submitting post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 mb-6">
      {error && <ErrorMessage message={error} />}

      <Input
        type="text"
        name="title"
        placeholder="What's on your mind?"
        label="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <Textarea
        name="content"
        placeholder="Share your thoughts..."
        label="Content"
        rows={5}
        value={formData.content}
        onChange={handleChange}
      />

      <div className="flex gap-3 mt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {initialPost ? 'Update Post' : 'Post'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
