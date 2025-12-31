'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-red-50">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-red-600">Something went wrong!</h2>
            <p className="text-gray-700 mb-6">A critical error occurred. Please refresh the page.</p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
