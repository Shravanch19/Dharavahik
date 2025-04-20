async function fetchTMDBId(movieTitle) {
  const apiKey = 'd579a3b4f56a93350365161cf8a667b2';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${(movieTitle)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const movie = data.results[0];
      console.log(`TMDB ID for "${movieTitle}" is: ${movie.id}`);
      return movie.id;
    } else {
      console.log(`No results found for "${movieTitle}"`);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const name = await req.nextUrl.searchParams.get("query");
  const movieDetails = await fetchTMDBId(name);
  return new Response(JSON.stringify({ response: movieDetails }));
}
