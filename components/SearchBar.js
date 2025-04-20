"use client";
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
// import './SearchBar.css';
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search?query=${query}`);
    };
    return (
        <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-[20vw] py-2.5 pl-4 pr-12 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent transition-all duration-300"
                    placeholder="Search movies, TV shows..."
                />
                <button 
                    type="submit" 
                    className="absolute right-0 p-2 text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label="Search"
                >
                    <IoSearchOutline className="w-5 h-5" />
                </button>
            </div>
        </form>
    )
}

export default SearchBar