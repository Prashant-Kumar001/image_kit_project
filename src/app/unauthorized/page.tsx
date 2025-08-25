'use client'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Link
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
