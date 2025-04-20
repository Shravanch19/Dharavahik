import { Suspense } from 'react';
import Header from "@/components/Home_pg/Header";
import Homepg from "@/components/Home_pg/Homepg";
import ErrorBoundary from '@/components/ErrorBoundary';

// Metadata for SEO
export const metadata = {
  title: 'Dharavahik - Your Ultimate Movie Destination',
  description: 'Discover and watch your favorite movies, TV shows, and more on Dharavahik. Stream top-rated content including sci-fi, kids favorites, and trending movies.',
  keywords: 'movies, streaming, entertainment, sci-fi movies, kids movies, top rated movies',
};

// Loading component
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="loading"></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <ErrorBoundary>
        <Header />
        <Suspense fallback={<Loading />}>
          <Homepg />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
