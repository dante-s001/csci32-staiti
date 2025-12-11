'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  //
  if (user) {
    router.push('/dashboard')
    return <div>Loading...</div>
  }

  //landing page content
  return (
    <div className="flex flex-col justify-center mx-auto m-24 bg-gray-200 h-64 w-screen rounded-lg">
      <div className="px-8">
        <div className="text-2xl">Welcome to my website!</div>
        <div className="mt-4">
          <p className="mb-4">Please sign in to comment:</p>
          <div className="flex gap-4">
            <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/welcome">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
