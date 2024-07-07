"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
const QualityButton = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryParam = searchParams.get('query');
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/Download_Opt?query=${(queryParam)}`, {
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
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex items-center justify-center'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Download Here</button>
                    <p>{data}</p>
                </div>
            )}
        </div>
    )
}


export default QualityButton