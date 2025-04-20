'use client';

import React, { Suspense } from 'react';
import Full_Header from "@/components/Full_Header"
import SearchPG from "@/components/Search_pg/SearchPG"
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-red-400 text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-300 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Full_Header />
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Reset the state here if needed
          window.location.reload();
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SearchPG />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Page;