import React, { Suspense } from 'react';
import Full_Header from '@/components/Full_Header'
import Movie_Page from '@/components/Movie_pg/Movie_Page'
import { Metadata } from 'next'

export const metadata = {
  title: 'Watch Movies and TV Shows | Dharavahik',
  description: 'Watch your favorite movies and TV shows in high quality. Stream the latest releases and popular classics.',
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorBoundary = ({ children }) => {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Full_Header />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Movie_Page />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default page