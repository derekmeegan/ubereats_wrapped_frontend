export const ProcessingMessage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Login Successful!
        </h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Great! You're now logged in. Our AI agent is analyzing your UberEats order history.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800 dark:text-blue-200 font-medium">Processing your data...</span>
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            This may take a few minutes. We'll email you the results when complete.
          </p>
        </div>
        
        <div className="text-left bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What we're analyzing:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Order frequency and patterns</li>
            <li>• Favorite restaurants and cuisines</li>
            <li>• Spending habits over time</li>
            <li>• Peak ordering times</li>
            <li>• Geographic delivery locations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 