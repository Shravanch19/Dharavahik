"use client";
import React, { useState, useEffect } from 'react';
import Stars from './Home_Back/Stars';
import Houses from '../Houses/Houses';
import Sliding_panel from '../Sliding/Sliding';
import './Homepg.css';

const Homepg = () => {
  const [movies, setMovies] = useState({
    topFavorite: [],
    kidsFavorite: [],
    Sci_Fi: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/allMovies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="loading_screen">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="movies_container sm:w-[98.75vw] w-[100vw] flex flex-col items-center relative overflow-hidden pb-4">
      <Stars />
      <Houses />
      <Sliding_panel title="Top Favorite Movies" movies={movies.topFavorite} />
      <Sliding_panel title="Kids Favorite Movies" movies={movies.kidsFavorite} />
      <Sliding_panel title="Sci-Fi Movies" movies={movies.Sci_Fi} />

    </div>
  );
};

export default Homepg;
