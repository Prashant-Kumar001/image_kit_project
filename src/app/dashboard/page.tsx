'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from './navbar'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userRole = (session.user as any)?.role || 'user'

  return (
    <div className="min-h-screen">
      <Navbar userRole={userRole} session={session} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-400 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              <p>
                Welcome to your dashboard! This area is only accessible to authenticated users.
              </p>

              {userRole === 'admin' && (
                <p className="mt-4 text-blue-600 font-medium">
                  You are logged in as <strong>Admin</strong>.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
