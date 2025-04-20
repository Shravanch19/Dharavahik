import { MongoClient } from "mongodb";
import { Movie_Desc_Generator, Series_Desc_Generator } from "./movie_list.js";

// Connection management
let client = null;
let isConnected = false;

// Initialize MongoDB connection
async function connectToDatabase() {
    if (isConnected) return;

    if (!process.env.MONGODB_URI) {
        throw new Error("MongoDB connection string is not defined in environment variables");
    }

    try {
        client = new MongoClient(process.env.MONGODB_URI, {
            maxPoolSize: 10,
            minPoolSize: 5,
            connectTimeoutMS: 10000,
        });
        await client.connect();
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

// Generic database operation function to reduce code duplication
async function performDbOperation(operation) {
    if (!isConnected) {
        await connectToDatabase();
    }

    try {
        return await operation();
    } catch (error) {
        console.error("Database operation error:", error);
        throw error;
    }
}

// Generic insert function for movies
async function insertMovie(name, collectionName, generator = Movie_Desc_Generator) {
    return performDbOperation(async () => {
        const db = client.db('Movies');
        const mainCollection = db.collection('Movies_List');
        const specificCollection = db.collection(collectionName);

        const movieData = await generator(name);

        // Use updateOne with upsert instead of insertOne to handle duplicates
        await Promise.all([
            mainCollection.updateOne(
                { name: movieData.name },
                { $set: movieData },
                { upsert: true }
            ),
            specificCollection.updateOne(
                { name: movieData.name },
                { $set: movieData },
                { upsert: true }
            )
        ]);

        return movieData.ID;
    });
}

// Generic find function
async function findInCollection(collectionName, query = {}) {
    return performDbOperation(async () => {
        const db = client.db('Movies');
        const collection = db.collection(collectionName);
        return await collection.find(query).toArray();
    });
}

// Movie operations
async function insert(name) {
    return insertMovie(name, 'Movies_List');
}

async function insertTv(name) {
    return insertMovie(name, 'TV_Series', Series_Desc_Generator);
}
async function insertToTv(name, collectionName) {
    return insertMovie(name, collectionName, Series_Desc_Generator);
}


async function find(name) {
    console.log('Searching for movies with name:', name);
    const results = await findInCollection('Movies_List', {
        name: { $regex: name, $options: "i" }
    });
    console.log('Search results:', results);
    return results;
}

async function findByID(ID) {
    const parsedID = parseInt(ID, 10);
    if (isNaN(parsedID)) {
        throw new Error("Invalid ID format");
    }
    return findInCollection('Movies_List', { ID: parsedID });
}

async function findAll() {
    return findInCollection('Movies_List');
}


async function kidsFavoriteMovies_Find() {
    return findInCollection('KidsFavoriteMovies_List');
}

async function findTopIMDBSeries() {
    return findInCollection('top_imdb_series');
}

async function findTrendingContent() {
    return findInCollection('trending');
}
async function findPopularMovies() {
    return findInCollection('popular_movies');
}

// Cleanup function to be called when shutting down the application
async function closeConnection() {
    if (client && isConnected) {
        await client.close();
        isConnected = false;
        console.log("MongoDB connection closed");
    }
}

export {
    insert, insertTv, find, findByID, findAll,
    kidsFavoriteMovies_Find, findTopIMDBSeries,
    findTrendingContent,
    findPopularMovies,
    closeConnection
};


