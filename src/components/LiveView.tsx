interface LiveViewProps {
  liveViewUrl: string;
}

export const LiveView = ({ liveViewUrl }: LiveViewProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Login to Your UberEats Account
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-2">Please follow these steps:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Log in to your UberEats account in the window below</li>
                <li>Complete any multi-factor authentication (MFA) if prompted</li>
                <li>Wait for the system to confirm your login</li>
              </ol>
              <p className="mt-2 text-xs">
                Your credentials are secure and processed through an encrypted browser session.
              </p>
            </div>
          </div>
        </div>
      </div>
      
        <iframe
          src={liveViewUrl}
          sandbox="allow-same-origin allow-scripts"
          allow="clipboard-read; clipboard-write"
          className="w-full border-0"
          title="UberEats Login"
        />
    </div>
  );
}; 