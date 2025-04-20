import { kidsFavoriteMovies_Find, findTopIMDBSeries, findTrendingContent, findPopularMovies} from "@/lib/Mongo.js";
export async function GET() {

  const topFavorite = await findTopIMDBSeries();
  const kidsFavorite = await kidsFavoriteMovies_Find();
  const trending = await findTrendingContent();
  const popular = await findPopularMovies();
  return new Response(JSON.stringify({ topFavorite, kidsFavorite, trending, popular }));
}
