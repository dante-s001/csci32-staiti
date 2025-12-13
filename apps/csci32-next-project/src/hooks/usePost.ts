import { useState } from 'react'
import { gqlClient } from '../services/graphql-client'
import { ClientError } from 'graphql-request'
import type { CreatePostInput } from '../generated/graphql'

// Use raw string instead of graphql() function
const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input)
  }
`

export function usePost() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (err instanceof ClientError) {
      return err.response?.errors?.[0]?.message || fallback
    }
    return fallback
  }

  const createPost = async (input: CreatePostInput): Promise<string | null> => {
    try {
      setIsLoading(true)
      setError(null)

      // Debug: Check if token exists
      const token = localStorage.getItem('authToken')
      console.log('Auth token exists:', !!token)
      console.log('Creating post with input:', input)

      const result: any = await gqlClient.request(CREATE_POST_MUTATION, { input })
      console.log('Create post result:', result)

      if (result.createPost) {
        return result.createPost
      }

      return null
    } catch (err) {
      console.error('Post creation error:', err)
      const errorMessage = extractErrorMessage(err, 'Failed to create post')
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    createPost,
    isLoading,
    error,
    clearError,
  }
}
