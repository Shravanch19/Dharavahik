import './Sliding.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from 'react';
import Link from 'next/link';

const Sliding_panel = ({ movies, title }) => {
    const cardContainerRef = useRef(null);

    const scrollLeft = () => {
        cardContainerRef.current.scrollBy({
            top: 0,
            left: -600,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        cardContainerRef.current.scrollBy({
            top: 0,
            left: 600,
            behavior: 'smooth'
        });
    };

    return (
        <div className="panel mx-auto w-[95vw] sm:my-6 my-1 sm:p-5 p-1">
            <h2 className="panel-title text-white text-2xl mb-3 font-bold ml-5">{title}</h2>
            <div className="relative">
                <button className="scroll-button left-0" onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <div className="card-container flex sm:gap-8 gap-4 overflow-x-scroll no-scrollbar" ref={cardContainerRef}>
                    {movies.map((movie) => (
                        <div key={movie.name} className="card rounded-md overflow-hidden relative transition-transform duration-300 hover:scale-105">
                            <Link href={`/movie?query=${movie.ID}`} className="card-link">
                                <img src={movie.poster} alt="Movie Poster" className="card__img" />
                            </Link>
                        </div>
                    ))}
                </div>
                <button className="scroll-button right-0" onClick={scrollRight}>
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};

export default Sliding_panel;
