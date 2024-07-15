import { Marvel_find, harryPotterMovies_Find, Pirates_Find, Disney_Find} from "@/lib/Mongo.js";
export async function GET(req) {
    const house_name = await req.nextUrl.searchParams.get("query");

    let data;
    if (house_name == "marvel") {
        data = await Marvel_find();
    }

    if (house_name == "HP") {
        data = await harryPotterMovies_Find();
    }
    if (house_name == "Pirates") {
        data = await Pirates_Find();
    }
    if (house_name == "disney") {
        data = await Disney_Find();
    }

    return new Response(JSON.stringify({ response: data }));
}