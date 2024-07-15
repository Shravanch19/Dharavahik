import { insert } from '@/lib/Mongo.js';
export async function POST(req) {
  const body = await req.json();
  const movieName = body.movieName;
  const Id = await insert(movieName);
  return new Response(JSON.stringify({ response: Id }));
}