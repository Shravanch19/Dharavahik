'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Cards from '../Cards/Cards';
import './Searchpg.css';
import debounce from 'lodash/debounce';

const SearchPG = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        debounce(async (query) => {
            if (!query) {
                setData(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        const queryParam = searchParams.get('query');
        fetchData(queryParam);
    }, [searchParams, fetchData]);

    if (error) {
        return (
            <div className="container mx-auto px-8 py-6 bg-gray-900 text-white min-h-[60vh] flex items-center justify-center">
                <div className="bg-red-900/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Error</h2>
                    <p className="text-gray-300">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-8 py-6 bg-gray-900 text-white sm:min-h-[90vh] min-h-[60vh]">
            <div className="mt-16">
                <h1 className="text-center text-3xl mb-2 font-bold text-gray-100">
                    Search Results
                </h1>
                {searchParams.get('query') && (
                    <p className="text-center text-gray-400">
                        Showing results for "{searchParams.get('query')}"
                    </p>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : data?.response?.length === 0 ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
                        <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                        <p className="text-gray-400">
                            We couldn't find any matches for your search. Try different keywords or browse our categories.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-gray-400 mb-4">
                        Found {data?.response?.length || 0} results
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data?.response?.map((movie, index) => (
                            <Cards
                                key={movie.ID || index}
                                poster={movie.poster}
                                name={movie.name}
                                year={movie.year}
                                ID={movie.ID}
                                rating={movie.IMDB_Rating}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchPG;
