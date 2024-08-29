import axios from 'axios'
async function Movie_Desc_Generator(search_query) {

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    let omdb_api_key = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${(search_query)}`;
    const OMDB = await axios.get(`http://www.omdbapi.com/?t=${(search_query)}&apikey=${omdb_api_key}`);

    let youtube_api_key = process.env.NEXT_PUBLIC_YT_API_KEY;

    const response = await axios.get(url);

    const YT_response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            key: youtube_api_key,
            part: 'snippet',
            q: `${search_query} trailer`,
            maxResults: 1,
            type: 'video',

        },
    });

    let trailerUrl;
    if (YT_response.data.items.length > 0) {
        const videoId = YT_response.data.items[0].id.videoId;
        trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;
    } else {
        throw new Error(`No trailer found for ${search_query}`);
    }

    let movie = response.data.results[0];
    let Movied = OMDB.data;
    const movieDetails = {
        name: Movied.Title,
        ID : movie.id,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        IMDB_Rating: movie.vote_average,
        genre: OMDB.data.Genre,
        year: OMDB.data.Year,
        Desc: movie.overview,
        StoryLine: Movied.Plot,
        trailer: trailerUrl,
        type : Movied.Type
    };
    return movieDetails
}

async function Series_Desc_Generator(search_query) {
    

    const apiKey = 'd579a3b4f56a93350365161cf8a667b2';
    let omdb_api_key = 'a32d7c00'
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${(search_query)}`;
    const OMDB = await axios.get(`https://www.omdbapi.com/?apikey=${omdb_api_key}&t=${(search_query)}&type=series`);

    let youtube_api_key = 'AIzaSyB_89jWYiYaBSp7m7EbTb5DK9k3tP-t6Ko';

    const response = await axios.get(url);

    const YT_response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            key: youtube_api_key,
            part: 'snippet',
            q: `${search_query} trailer`,
            maxResults: 1,
            type: 'video',

        },
    });

    let trailerUrl;
    if (YT_response.data.items.length > 0) {
        const videoId = YT_response.data.items[0].id.videoId;
        trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;
    } else {
        throw new Error(`No trailer found for ${search_query}`);
    }

    let movie = response.data.results[0];
    let Movied = OMDB.data;
    const movieDetails = {
        name: Movied.Title,
        ID : movie.id,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        IMDB_Rating: movie.vote_average,
        genre: OMDB.data.Genre,
        year: OMDB.data.Year,
        Desc: movie.overview,
        StoryLine: Movied.Plot,
        trailer: trailerUrl,
        Seasons: Movied.totalSeasons,
        Episodes: await Promise.all(
            Array.from({ length: Movied.totalSeasons }, (_, season) => season + 1).map(
                async (seasonNumber) => {
                    const { data } = await axios.get(
                        `https://api.themoviedb.org/3/tv/${movie.id}/season/${seasonNumber}`, {
                            params: {
                                api_key: apiKey,
                            },
                        });
                    return data.episodes.length;
                }
            )
        ),
        type : Movied.Type

    };
    return movieDetails

}

export {Movie_Desc_Generator, Series_Desc_Generator}