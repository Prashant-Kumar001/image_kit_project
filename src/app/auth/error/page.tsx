
// ==========================================
// Enhanced Error Page with More Scenarios
// app/auth/error/page.tsx
// ==========================================
'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null): { title: string; message: string } => {
    switch (error) {
      case 'CredentialsSignin':
        return {
          title: 'Invalid Credentials',
          message: 'The email or password you entered is incorrect. Please try again.'
        }
      case 'Configuration':
        return {
          title: 'Server Configuration Error',
          message: 'There was a problem with the server configuration. Please contact support.'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'You do not have permission to sign in.'
        }
      case 'Verification':
        return {
          title: 'Verification Error',
          message: 'The verification token has expired or is invalid.'
        }
      case 'OAuthSignin':
        return {
          title: 'OAuth Sign-in Error',
          message: 'Error occurred during OAuth provider sign-in.'
        }
      case 'OAuthCallback':
        return {
          title: 'OAuth Callback Error',
          message: 'Error in handling the response from OAuth provider.'
        }
      case 'OAuthCreateAccount':
        return {
          title: 'Account Creation Error',
          message: 'Could not create OAuth account in the database.'
        }
      case 'EmailCreateAccount':
        return {
          title: 'Email Account Error',
          message: 'Could not create email account in the database.'
        }
      case 'Callback':
        return {
          title: 'Callback Error',
          message: 'Error in the OAuth callback handler route.'
        }
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Not Linked',
          message: 'Another account with the same email address exists but is not linked to this OAuth account.'
        }
      case 'SessionRequired':
        return {
          title: 'Session Required',
          message: 'You must be signed in to access this page.'
        }
      case 'DatabaseConnection':
        return {
          title: 'Database Connection Error',
          message: 'Unable to connect to the database. Please try again later.'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication. Please try again.'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-red-500 mb-4">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {errorInfo.title}
          </h2>
          
          <p className="mt-2 text-sm text-red-600">
            {errorInfo.message}
          </p>
          
          {error && (
            <p className="mt-2 text-xs text-gray-500">
              Error Code: {error}
            </p>
          )}
          
          <div className="mt-8 space-y-4">
            <Link
              href="/auth/signin"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Signing In Again
            </Link>
            
            <Link
              href="/auth/register"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Account
            </Link>
            
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}