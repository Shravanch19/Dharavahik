"use client";
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search?query=${query}`);
    };
    return (
        <form onSubmit={handleSearch} className="search flex items-center justify-evenly mr-3">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 w-[15vw] rounded-l-lg text-black"
                placeholder="   Search..."
            />
            <button type="submit" className="search-icon p-3 bg-white rounded-r-md text-black font-semibold">
                <IoSearchOutline />
            </button>
        </form>
    )
}

export default SearchBar