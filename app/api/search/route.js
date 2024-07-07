import { find } from "@/lib/Mongo.js";
export async function GET(req) {
  const name = await req.nextUrl.searchParams.get("query"); 
  const movieDetails = await find(name);
  return new Response(JSON.stringify({ response : movieDetails }));
}
