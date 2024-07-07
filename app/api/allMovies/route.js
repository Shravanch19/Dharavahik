import {findAll} from "@/lib/Mongo.js";
export async function GET() {
  const movieDetails = await findAll();
  return new Response(JSON.stringify(movieDetails));
}
