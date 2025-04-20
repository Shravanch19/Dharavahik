"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Stars from './Home_Back/Stars';
import Sliding_panel from '../Sliding/Sliding';
import { FaSync, FaSearch } from 'react-icons/fa';

const Homepg = () => {
  const [movies, setMovies] = useState({
    popular: [],
    kidsFavorite: [],
    topFavorite: [],
    trending: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/allMovies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setError(error.message || 'Failed to load movies. Please try again later.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMovies();
  };

  const filterMovies = (movieList) => {
    if (!searchTerm) return movieList;
    return movieList.filter(movie => 
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderSkeletonLoading = () => (
    <div className="w-full p-5">
      {[1, 2, 3, 4].map((section) => (
        <div key={section} className="mb-8">
          <div className="h-6 w-48 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-shimmer rounded mb-4"></div>
          <div className="flex gap-4 overflow-x-hidden">
            {[1, 2, 3, 4, 5].map((card) => (
              <div key={card} className="h-48 w-36 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-shimmer rounded-lg flex-shrink-0"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center p-5">
      <h2 className="text-2xl mb-2 text-red-500">Oops! Something went wrong</h2>
      <p className="text-gray-400 mb-5">{error}</p>
      <button 
        className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <FaSync className={isRefreshing ? 'animate-spin' : ''} />
      </button>
    </div>
  );

  if (isLoading && !isRefreshing) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-15 h-15 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return renderError();
  }

  return (
    <div className="bg-gray-900 text-white sm:w-[98.75vw] w-[100vw] flex flex-col items-center relative overflow-hidden pb-4 p-5">
      <Stars />
      
      <div className="w-full flex justify-between items-center px-4 py-2 mb-5 z-10">
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full py-2.5 px-4 pl-10 rounded-full border border-gray-700 bg-white/10 text-white text-sm transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white/15 focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
        <button 
          className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh movies"
        >
          <FaSync className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>
      
      {isRefreshing ? (
        renderSkeletonLoading()
      ) : (
        <>
          <Sliding_panel title="Popular Movies" movies={filterMovies(movies.popular)} />
          <Sliding_panel title="Top IMDB Series" movies={filterMovies(movies.topFavorite)} />
          <Sliding_panel title="Trending Movies" movies={filterMovies(movies.trending)} />
          <Sliding_panel title="Kids Favorite Movies" movies={filterMovies(movies.kidsFavorite)} />
        </>
      )}
    </div>
  );
};

export default Homepg;
