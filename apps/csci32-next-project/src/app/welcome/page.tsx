import Auth from '@/components/Auth'

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-4 px-4">
      <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/">
        Home
      </a>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome! </h1>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Please log in or create an account here:</h2>
        <Auth />
      </div>
    </div>
  )
}
