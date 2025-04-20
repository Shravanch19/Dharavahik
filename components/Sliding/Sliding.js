import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const Sliding_panel = ({ movies, title, isLoading = false, error = null }) => {
    const cardContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    // Check if we can scroll left or right
    const checkScrollButtons = () => {
        if (cardContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = cardContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
        }
    };

    // Update scroll buttons on mount and when movies change
    useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, [movies]);

    // Handle scroll events
    const handleScroll = () => {
        if (!isScrolling) {
            setIsScrolling(true);
            setTimeout(() => {
                checkScrollButtons();
                setIsScrolling(false);
            }, 150);
        }
    };

    const scrollLeft = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollBy({
                top: 0,
                left: -600,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollBy({
                top: 0,
                left: 600,
                behavior: 'smooth'
            });
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft' && canScrollLeft) {
            scrollLeft();
        } else if (e.key === 'ArrowRight' && canScrollRight) {
            scrollRight();
        }
    };

    // Handle movie click
    const handleMovieClick = (e, movieId) => {
        // Prevent navigation if it's just a scroll
        if (e.target.closest('.card-container')) {
            return;
        }
    };

    if (error) {
        return (
            <div className="panel mx-auto w-[95vw] sm:my-5 mt-4 sm:p-5 p-1">
                <h2 className="panel-title text-center text-white text-sm sm:text-2xl mb-2 sm:mb-4 font-bold sm:ml-2">{title}</h2>
                <div className="error-container text-center p-4 bg-red-900/30 rounded-md">
                    <p className="text-white">Failed to load movies. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="panel mx-auto w-[95vw] sm:my-5 mt-4 sm:p-5 p-1">
            <h2 className="panel-title text-center text-white text-sm sm:text-2xl mb-2 sm:mb-4 font-bold sm:ml-2">{title}</h2>
            <div className="relative" onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label={`${title} movie carousel`}>
                {canScrollLeft && (
                    <button 
                        className="absolute top-1/2 -translate-y-1/2 left-0 bg-black/50 text-white border-none p-2.5 cursor-pointer z-10 rounded-r-md hover:bg-black/70 transition-colors" 
                        onClick={scrollLeft}
                        aria-label="Scroll left"
                        disabled={isLoading}
                    >
                        <FaAngleLeft />
                    </button>
                )}
                <div 
                    className="flex sm:gap-8 gap-4 overflow-x-scroll scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" 
                    ref={cardContainerRef}
                    onScroll={handleScroll}
                    role="list"
                    aria-label={`${title} movies`}
                >
                    {isLoading ? (
                        // Loading skeleton
                        Array(5).fill(0).map((_, index) => (
                            <div key={`skeleton-${index}`} className="bg-gray-700 flex-none rounded-md overflow-hidden relative animate-pulse h-[120px] sm:h-[45vh] w-[150px] sm:w-[200px]"></div>
                        ))
                    ) : movies && movies.length > 0 ? (
                        movies.map((movie) => (
                            <div 
                                key={movie.name} 
                                className="bg-gray-800 flex-none rounded-md overflow-hidden relative transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group"
                                role="listitem"
                            >
                                <Link 
                                    href={`/movie?query=${movie.ID}`} 
                                    className="no-underline block"
                                    onClick={(e) => handleMovieClick(e, movie.ID)}
                                >
                                    <div className="relative">
                                        <img 
                                            src={movie.poster} 
                                            alt={`${movie.name} poster`} 
                                            className="w-full h-[120px] sm:h-[45vh] object-cover bg-no-repeat transition-transform duration-300 group-hover:brightness-75"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                {movie.rating && (
                                                    <div className="flex items-center bg-yellow-500/80 px-2 py-0.5 rounded text-xs font-bold">
                                                        <span className="text-white">{movie.rating}</span>
                                                    </div>
                                                )}
                                                {movie.year && (
                                                    <div className="bg-gray-700/80 px-2 py-0.5 rounded text-xs text-gray-200">
                                                        {movie.year}
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-white text-sm sm:text-base font-bold truncate mb-1">{movie.name}</h3>
                                            {movie.genre && (
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {movie.genre.split(',').slice(0, 2).map((genre, index) => (
                                                        <span key={index} className="bg-blue-500/30 text-blue-200 text-xs px-2 py-0.5 rounded-full">
                                                            {genre.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="mt-auto">
                                                <div className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-all duration-300 transform hover:scale-110 shadow-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 bg-gray-800">
                                        <h3 className="text-white text-xs sm:text-sm font-medium truncate">{movie.name}</h3>
                                        {movie.rating && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="text-yellow-500 text-xs">★</span>
                                                <span className="text-gray-400 text-xs">{movie.rating}</span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-white text-center w-full py-8">No movies available</div>
                    )}
                </div>
                {canScrollRight && (
                    <button 
                        className="absolute top-1/2 -translate-y-1/2 right-0 bg-black/50 text-white border-none p-2.5 cursor-pointer z-10 rounded-l-md hover:bg-black/70 transition-colors" 
                        onClick={scrollRight}
                        aria-label="Scroll right"
                        disabled={isLoading}
                    >
                        <FaAngleRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sliding_panel;
