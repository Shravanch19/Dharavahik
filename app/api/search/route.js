import { find } from "@/lib/Mongo.js";
import { NextResponse } from 'next/server';

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { response: [] },
        { status: 200 }
      );
    }

    const movieDetails = await find(query);
    
    return NextResponse.json({
      response: movieDetails || []
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { 
        response: [],
        error: error.message 
      },
      { status: 500 }
    );
  }
}
