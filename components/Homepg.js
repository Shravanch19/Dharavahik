"use client";
import React, { useState, useEffect } from 'react';
import Cards from './Cards';

const Homepg = () => {
  const [movieList, setMovieList] = useState([]);
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
        setMovieList(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-background w-[100vw] flex flex-col items-center'>
      <h2 className='text-3xl font-bold p-4'>Trending</h2>
      <div className='cards_container flex flex-wrap items-center justify-center gap-14 mt-8 w-[90%] '>
        {movieList.map((movie, index) => (
          <Cards 
            key={index} 
            poster={movie.poster} 
            name={movie.name} 
            IMDB_Rating={movie.IMDB_Rating} 
          />
        ))}
      </div>
    </div>
  );
};

export default Homepg;
