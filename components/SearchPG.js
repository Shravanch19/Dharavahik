'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cards from './Cards';

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
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Search Results</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Cards
                    poster={data.response.poster}
                    name={data.response.name}
                    IMDB_Rating={data.response.IMDB_Rating}
                />
            )}
        </div>
    );
};

export default SearchPG;
