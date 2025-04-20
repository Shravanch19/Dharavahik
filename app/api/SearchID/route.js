import { findByID } from "@/lib/Mongo.js";

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const ID = await req.nextUrl.searchParams.get("query"); 
  const movieDetails = await findByID(ID);
  return new Response(JSON.stringify({ response : movieDetails }));
}