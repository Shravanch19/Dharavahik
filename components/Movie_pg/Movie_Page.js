"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Movie_Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ID, setID] = useState(null);
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [showIframe, setShowIframe] = useState(false);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (!queryParam) {
            setError('No movie ID provided');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/SearchID?query=${queryParam}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                if (!result.response || result.response.length === 0) {
                    throw new Error('No movie data found');
                }
                
                setData(result);
                setID(result.response[0].ID);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    const handleSeasonChange = (e) => {
        const selectedSeason = e.target.value;
        setSeason(selectedSeason);
        setEpisodes(Array.from({ length: data.response[0].Episodes[selectedSeason - 1] }, (_, index) => index + 1));
        setEpisode('');
    };

    const handleSubmit = () => {
        setShowIframe(true);
    };

    const handleBack = () => {
        router.back();
    };

    if (error) {
        return (
            <div className="text-center p-8 bg-red-900/50 rounded-lg mx-auto max-w-2xl my-16">
                <h2 className="text-red-400 text-xl font-semibold mb-4">Error: {error}</h2>
                <button 
                    onClick={handleBack} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {loading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 mt-16">
                    <button 
                        onClick={handleBack} 
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4"
                    >
                        ← Go Back
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 mb-8">
                        <img 
                            src={data.response[0].poster} 
                            alt={`${data.response[0].name} Poster`} 
                            className="w-full rounded-lg shadow-lg"
                            loading="lazy"
                        />
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">{data.response[0].name}</h1>
                            <div className="flex flex-wrap gap-4 mb-4">
                                <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md text-sm">{data.response[0].year}</span>
                                <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md text-sm">{data.response[0].genre}</span>
                                <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md text-sm">IMDB: {data.response[0].IMDB_Rating}</span>
                            </div>
                            <p className="text-lg text-gray-300 leading-relaxed">{data.response[0].StoryLine}</p>
                        </div>
                    </div>
                    {data.response[0].trailer && (
                        <div className="my-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Trailer</h2>
                            <iframe
                                width="100%"
                                height="450"
                                src={`https://www.youtube.com/embed/${data.response[0].trailer.substring(32)}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="rounded-lg shadow-lg"
                            ></iframe>
                        </div>
                    )}
                    {data.response[0].type === "series" ? (
                        <div className="bg-gray-700/50 p-6 rounded-lg my-8 border border-gray-600">
                            <h2 className="text-2xl font-semibold text-white mb-4">Select Season and Episode</h2>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <select 
                                    value={season} 
                                    onChange={handleSeasonChange}
                                    className="p-2 bg-gray-700 border border-gray-600 rounded-md min-w-[150px] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Season</option>
                                    {Array.from({ length: data.response[0].Seasons }, (_, index) => (
                                        <option key={index} value={index + 1}>{`Season ${index + 1}`}</option>
                                    ))}
                                </select>
                                <select 
                                    value={episode} 
                                    onChange={(e) => setEpisode(e.target.value)} 
                                    disabled={!season}
                                    className="p-2 bg-gray-700 border border-gray-600 rounded-md min-w-[150px] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-800 disabled:text-gray-500"
                                >
                                    <option value="">Select Episode</option>
                                    {episodes.map((ep, index) => (
                                        <option key={index} value={ep}>{`Episode ${ep}`}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                onClick={handleSubmit} 
                                disabled={!season || !episode} 
                                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
                            >
                                Watch Now
                            </button>
                        </div>
                    ) : (
                        <div className="my-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Watch Here</h2>
                            <iframe
                                src={`https://www.NontonGo.win/embed/movie/${ID}`}
                                className="w-full h-[60vh] rounded-lg shadow-lg"
                                frameBorder="0"
                                referrerPolicy="origin"
                                loading="lazy"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    {showIframe && data.response[0].type === "series" && (
                        <div className="my-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Watch Here</h2>
                            <iframe
                                src={`https://www.NontonGo.win/embed/tv/${ID}/${season}/${episode}`}
                                className="w-full h-[60vh] rounded-lg shadow-lg"
                                frameBorder="0"
                                referrerPolicy="origin"
                                loading="lazy"
                                allow='autoplay; fullscreen'
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    <div className="mt-8 pt-8 border-t border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Description</h2>
                        <p className="text-gray-300 leading-relaxed">{data.response[0].Desc}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie_Page;
