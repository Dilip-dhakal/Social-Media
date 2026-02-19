'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { Textarea } from '@/components/Textarea'
import { ErrorMessage } from '@/components/ErrorMessage'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
  isLoading?: boolean
  error?: string
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  isLoading = false,
  error = '',
}) => {
  const [content, setContent] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError('')

    if (!content.trim()) {
      setLocalError('Comment cannot be empty')
      return
    }

    try {
      await onSubmit(content)
      setContent('')
    } catch (err: any) {
      setLocalError(err.response?.data?.detail || 'Error posting comment')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-light-bg p-4 rounded-lg mb-4">
      {(error || localError) && <ErrorMessage message={error || localError} />}

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        className="mb-3"
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
      >
        Post Comment
      </Button>
    </form>
  )
}
