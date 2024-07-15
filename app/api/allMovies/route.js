import { topFavoriteMovies_Find, kidsFavoriteMovies_Find, Sci_Fi_Find} from "@/lib/Mongo.js";
export async function GET() {

  const topFavorite = await topFavoriteMovies_Find();
  const kidsFavorite = await kidsFavoriteMovies_Find();
  const Sci_Fi = await Sci_Fi_Find();
  return new Response(JSON.stringify({ topFavorite, kidsFavorite, Sci_Fi }));
}
