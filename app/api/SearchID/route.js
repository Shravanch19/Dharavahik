import { findByID } from "@/lib/Mongo.js";
export async function GET(req) {
  const ID = await req.nextUrl.searchParams.get("query"); 
  const movieDetails = await findByID(ID);
  return new Response(JSON.stringify({ response : movieDetails }));
}