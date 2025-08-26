import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = ({ userRole, session }: { userRole: string, session: any }) => {
    return (
        <nav className="shadow border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-semibold">Dashboard</h1>

                        {userRole === 'admin' && (
                            <Link
                                href="/admin"
                                className="text-sm bg-orange-600 hover:bg-orange-700 text-white font-medium px-3 py-2 rounded-md transition"
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-red-500">
                            Welcome, {session.user?.email}
                        </span>
                        <button
                            onClick={() => signOut()}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm text-white"
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