'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { signOut } from "next-auth/react"


export default function Home() {
  const { data: session, status } = useSession()

  console.log('session', session)

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (session) {
    return (
      <div className="min-h-screen font-poppins flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold  mb-4">
            Welcome back!
          </h1>
          <p className="text-gray-600 mb-8">
            You are already signed in as {session.user.email}
          </p>
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Go to Dashboard
          </Link>
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold  mb-4">
          Welcome to Our App
        </h1>
        <p className=" mb-8">
          Please sign in to access the application.
        </p>
        <div className="space-x-4">
          <Link
            href="/auth/signin"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="border border-gray-500  font-medium py-2 px-4 rounded"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
