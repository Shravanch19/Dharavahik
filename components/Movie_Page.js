"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
const Movie_Page = () => {
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
        <div>Movie_Page
            <br />
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div>
                            <img src={data.response.poster} alt="" />
                            <h1>{data.response.name}</h1>
                            <h2>{data.response.year}</h2>
                            <h3>{data.response.genre}</h3>
                            <h3>{data.response.IMDB_Rating}</h3>
                            <a href={data.response.IMDB_Link}>IMDB</a>
                        </div>
                        <div>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${data.response.YT_Link.substring(32)}`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div>{data.response.description}</div>
                        
                    </div>
                )}
            </div>

        </div>
    )
}

export default Movie_Page