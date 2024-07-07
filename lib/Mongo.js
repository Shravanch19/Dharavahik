import { MongoClient } from "mongodb";
import Movie_Desc_Generator from "./movie_list.js";

async function insert(name) {
    const client = new MongoClient("mongodb://localhost:27017");
    client.connect();
    const db = client.db('Movies');
    const collection = db.collection('Movies_List');
    try {
        const list = Movie_Desc_Generator(name);
        await collection.insertOne(list);

    } finally {

        await client.close();

    }
}

async function find(name) {

    const client = new MongoClient("mongodb://localhost:27017");
    client.connect();
    const db = client.db('Movies');
    const collection = db.collection('Movies_List');
    try {
        const findResult = await collection.findOne({ name });
        return findResult;s
    }
    finally {
        await client.close();
    }
}

async function findAll() {
    const client = new MongoClient("mongodb://localhost:27017");
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('Movies_List');

        const findResult = await collection.find({}).toArray();

        return findResult;
    } finally {
        await client.close();
    }
}

export default insert;
export { find, findAll };