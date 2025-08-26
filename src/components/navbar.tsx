'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Navbar = () => {

  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <nav className=" top-0 z-50">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold ">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-red-500">
                Welcome Admin, {session.user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar