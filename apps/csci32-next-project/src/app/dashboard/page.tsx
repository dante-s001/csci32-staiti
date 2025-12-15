'use client'

import { useAuth } from '@/hooks/useAuth'
import { usePost } from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardPage() {
  const { signOut, user, isHydrated } = useAuth()
  const { createPost, isLoading: isCreatingPost, error: postError, clearError } = usePost()
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(null)
    clearError()

    const postId = await createPost({ title, body, imageUrl })

    if (postId) {
      setSuccess(`Post created successfully! ID: ${postId}`)
      // Clear form
      setTitle('')
      setBody('')
      setImageUrl('')
    }
  }

  // Prevent hydration mismatch by only rendering user info after hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            {user && (
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {user.name}!
                {user.role && (
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded">
                    {user.role}
                  </span>
                )}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-white border-6 border-black rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome back{user?.name ? `, ${user.name}` : ''}! 🎉
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                You&apos;ve successfully signed in. Your authentication token is stored securely and will be used for
                all API requests.
              </p>
              {user && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-semibold text-gray-900 mb-2">Your Account Details:</h3>
                  <div className="space-y-1 text-sm">
                    {user.name && (
                      <p>
                        <span className="font-medium">Name:</span> {user.name}
                      </p>
                    )}
                    {user.email && (
                      <p>
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">User ID:</span> {user.user_id}
                    </p>
                    {user.role && (
                      <p>
                        <span className="font-medium">Role:</span> {user.role}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-3xl mb-2">🔐</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Secure</h3>
              <p className="text-gray-600 text-sm">JWT authentication active</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-green-600 text-3xl mb-2">✅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Authenticated</h3>
              <p className="text-gray-600 text-sm">You're logged in</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-purple-600 text-3xl mb-2">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready</h3>
              <p className="text-gray-600 text-sm">Start using the app</p>
            </div>
          </div> */}

          {/* Create Post Form (ONLY VISIBLE TO ADMIN)*/}
          {user?.role === 'Admin' ? (
            <div className="bg-white rounded-lg border-4 border-dashed border-green-300 shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Post</h2>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {postError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{postError}</div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">{success}</div>
                )}

                <button
                  type="submit"
                  disabled={isCreatingPost}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
                >
                  {isCreatingPost ? 'Creating...' : 'Create Post'}
                </button>
              </form>
            </div>
          ) : (
            <div className="">You should only see this if you are not an admin</div>
          )}
          {/* Info Section
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">ℹ️ What's Next?</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• All your GraphQL requests will now include your authentication token</li>
              <li>• Your session persists across browser refreshes (stored in localStorage)</li>
              <li>• Click "Sign Out" to clear your session and return to the welcome page</li>
            </ul>
          </div> */}
        </div>
      </main>
    </div>
  )
}
