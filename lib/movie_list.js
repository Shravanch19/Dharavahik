import axios from 'axios'
async function Movie_Desc_Generator(search_query) {
    let omdb_api_key = 'a32d7c00'
    let youtube_api_key = 'AIzaSyCGI2dreh8dhSJ93sUCoC1jiJDKz0EwSCA'

    const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(search_query)}&apikey=${omdb_api_key}`);

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

    const movie = response.data;
    const movieDetails = {
        name: movie.Title,
        poster: movie.Poster,
        IMDB_Rating: movie.imdbRating,
        genre: movie.Genre,
        year: movie.Year,
        Desc: movie.Plot,
        IMDB_Link: `https://www.imdb.com/title/${movie.imdbID}/`,
        YT_Link: trailerUrl
    };
    return movieDetails
}

export default Movie_Desc_Generator