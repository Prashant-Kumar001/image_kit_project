'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import navbar from '../../components/navbar';
import Navbar from '../../components/navbar';

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session && session.user.role !== 'admin') {
      router.push('/unauthorized?message=You are not authorized to access this page.')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div className="p-4">Loading...</div>
  }

  if (!session || session.user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen font-poppins ">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-red-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold  mb-4">
                Admin Panel
              </h2>
              <p className="">
                This is an admin-only route. Only users with admin role can access this.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}