import { kidsFavoriteMovies_Find, findTopIMDBSeries, findTrendingContent, findPopularMovies} from "@/lib/Mongo.js";

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET() {

  const topFavorite = await findTopIMDBSeries();
  const kidsFavorite = await kidsFavoriteMovies_Find();
  const trending = await findTrendingContent();
  const popular = await findPopularMovies();
  const reversepopular = popular.reverse();
  return new Response(JSON.stringify({ topFavorite, kidsFavorite, trending, popular }));
}
