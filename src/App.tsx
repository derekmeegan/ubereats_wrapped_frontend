import { useState } from 'react'
import { api } from './services/api'
import { useJobPolling } from './hooks/useJobPolling'
import {
  EmailForm,
  HowItWorks,
  LiveView,
  LoadingSpinner,
  ProcessingMessage,
} from './components'

function App() {
  const [jobId, setJobId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { jobStatus, error: pollingError } = useJobPolling(jobId)

  const handleEmailSubmit = async (email: string) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await api.startJob(email)
      setJobId(response.jobId)
      // Don't call startPolling() here - let useEffect handle it when jobId changes
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start analysis')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToLearnMore = () => {
    document.getElementById('learn-more-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
  }

  const renderContent = () => {
    if (jobStatus?.status === 'error') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😞</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We encountered an issue while analyzing your UberEats data. This could be due to account access issues or unexpected data formats.
              </p>
              {jobStatus.message && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{jobStatus.message}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setJobId(null)
                setError(null)
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    // Show error state
    if (error || pollingError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-6 max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error</h3>
                <p className="text-red-700 dark:text-red-300">{error || pollingError}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setError(null)
                setJobId(null)
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    // Show processing message when logged in
    if (jobStatus?.status === 'logged_in' || jobStatus?.status === 'extracting') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <ProcessingMessage />
        </div>
      )
    }

    // Show live view when login is needed
    if (jobStatus?.status === 'awaiting_login' && jobStatus.liveViewUrl) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <LiveView liveViewUrl={jobStatus.liveViewUrl} />
        </div>
      )
    }

    // Show loading while waiting for live view
    if (jobId && (!jobStatus || jobStatus.status === 'starting')) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <LoadingSpinner message="Preparing secure login session..." />
        </div>
      )
    }

    // Show landing page with form
    return (
      <>
        {/* Landing Section */}
        <div className="flex flex-col items-center justify-center min-h-screen pb-16">
          {/* Title */}
          <div className="text-center mb-8 mt-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              UberEats Wrapped
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover insights about your food delivery habits with AI-powered analysis of your UberEats order history
            </p>
          </div>

          {/* Email Form */}
          <div className="mb-16">
            <EmailForm 
              onSubmit={handleEmailSubmit} 
              isLoading={isSubmitting}
              onLearnMore={scrollToLearnMore}
            />
          </div>
        </div>

        {/* Learn More Section */}
        <div id="learn-more-section" className="py-8">
          <div className="max-w-4xl mx-auto px-6">
            {/* How It Works */}
            <div className="mb-8 flex justify-center">
              <HowItWorks />
            </div>

            {/* Try It CTA */}
            <div className="text-center mb-24">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all rounded-full font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Try UberEats Wrapped
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>

            {/* Tech Stack */}
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Built with</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  Stagehand
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  Browserbase
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  AWS
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  Vercel
                </span>
              </div>
            </div>

            {/* Creator */}
            <div className="text-center mb-24">
              <p className="text-gray-600 dark:text-gray-400">
                Made by{' '}
                <a 
                  href="https://derekmeegan.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Derek Meegan
                </a>
              </p>
            </div>

            {/* Footer */}
            <footer className="container mx-auto">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  UberEats Wrapped uses industry-standard encryption and never stores your login credentials. Your data is securely deleted after analysis.
                </p>
            </footer>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <main className="container mx-auto px-6">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
