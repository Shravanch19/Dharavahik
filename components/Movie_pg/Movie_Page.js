"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './Movie_pg.css';

const Movie_Page = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ID, setID] = useState(null);
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [showIframe, setShowIframe] = useState(false);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const queryParam = searchParams.get('query');

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/SearchID?query=${(queryParam)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                console.log('Fetched data:', result);
                setData(result);
                setID(result.response[0].ID);
            } catch (error) {
                console.error('Error fetching data:', error);
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

    return (
        <div className="movie-page">
            {loading ? (
                <div className='loading-screen'>
                    <div className='loading'></div>
                </div>
            ) : (
                <div className="movie-content">
                    <div className="movie-info">
                        <img src={data.response[0].poster} alt={`${data.response[0].name} Poster`} className="movie-poster" />
                        <div className="movie-details">
                            <h1>{data.response[0].name}</h1>
                            <h2>{data.response[0].year}</h2>
                            <h3>{data.response[0].genre}</h3>
                            <h3>IMDB: {data.response[0].IMDB_Rating}</h3>
                            <p>{data.response[0].StoryLine}</p>
                        </div>
                    </div>
                    <div className="movie-trailer">
                        <iframe
                            width="100%"
                            height="450px"
                            src={`https://www.youtube.com/embed/${data.response[0].trailer.substring(32)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    {data.response[0].type === "series" ? (
                        <div className="series-selection">
                            <h2>Select Season and Episode</h2>
                            <div className="dropdowns">
                                <select value={season} onChange={handleSeasonChange}>
                                    <option value="">Select Season</option>
                                    {Array.from({ length: data.response[0].Seasons }, (_, index) => (
                                        <option key={index} value={index + 1}>{`Season ${index + 1}`}</option>
                                    ))}
                                </select>
                                <select value={episode} onChange={(e) => setEpisode(e.target.value)} disabled={!season}>
                                    <option value="">Select Episode</option>
                                    {episodes.map((ep, index) => (
                                        <option key={index} value={ep}>{`Episode ${ep}`}</option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleSubmit} disabled={!season || !episode} className="submit-button">Submit</button>
                        </div>
                    ) : (
                        <div className="watch-here">
                            <h2>Watch Here</h2>
                            <iframe
                                src={`https://vidsrc.me/embed/movie?tmdb=${ID}`}
                                style={{ width: "100%", height: "calc(100vh - 56px)" }}
                                frameBorder="0"
                                referrerPolicy="origin"
                                loading="lazy"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    {showIframe && data.response[0].type === "series" && (
                        <div className="watch-here">
                            <h2>Watch Here</h2>
                            <iframe
                                src={`https://vidsrc.me/embed/tv?tmdb=${ID}&season=${season}&episode=${episode}`}
                                style={{ width: "100%", height: "calc(100vh - 56px)" }}
                                frameBorder="0"
                                referrerPolicy="origin"
                                loading="lazy"
                                allow='autoplay; fullscreen'
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    <div className="movie-description">
                        <p>{data.response[0].Desc}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie_Page;
