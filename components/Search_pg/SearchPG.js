'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import './Searchpg.css';

const SearchPG = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryParam = searchParams.get('query');
        // Fetch data from backend
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?query=${(queryParam)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                console.log('Fetched data:', result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }
        , [searchParams]);

    return (
        <div className="container mx-auto px-8 py-6 bg-gray-900 text-white">
            <h1 className="text-2xl mb-4 font-bold text-gray-100">Search Results</h1>
            {loading ? (
                <div className='loading_screen'><div className='loading'></div></div>
            ) : (
                data?.response?.length === 0 ? (
                    <div className='h-[60vh]'>
                        <div className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                            <p className="text-center text-gray-900 p-4">No data found</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data?.response?.map((movie, index) => (
                            <Cards
                                key={index}
                                poster={movie.poster}
                                name={movie.name}
                                IMDB_Rating={movie.IMDB_Rating}
                                year={movie.year}
                                ID={movie.ID}
                            />
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default SearchPG;
