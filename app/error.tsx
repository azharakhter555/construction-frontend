'use client' // ← ADD THIS LINE AT THE TOP

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 font-medium">Error:</p>
          <p className="text-red-600 text-sm mt-1">{error.message}</p>
          {error.digest && (
            <p className="text-red-500 text-xs mt-2">Error ID: {error.digest}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Try again
          </button>
          
          <Link
            href="/"
            className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            Go to Home
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>If the error persists, please contact support.</p>
        </div>
      </div>
    </div>
  )
}