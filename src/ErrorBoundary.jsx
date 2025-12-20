import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong
      </h1>
      <p className="text-lg mb-6">
        {error.status === 404
          ? "The page you're looking for doesn't exist."
          : 'We encountered an unexpected error.'}
      </p>
      <button
        className="px-4 py-2 bg-[#6C63FF] text-white rounded hover:bg-[#645cfd] transition"
        onClick={() => (window.location.href = '/')}
      >
        Go to Dashboard
      </button>
    </div>
  )
}

export default ErrorBoundary
