import { getQualityLinks } from "@/lib/Quality.js";
export async function GET(req) {
  const name = await req.nextUrl.searchParams.get("query");
  const movieDetails = await getQualityLinks(name);
  return new Response(JSON.stringify({ response: movieDetails }));
}
