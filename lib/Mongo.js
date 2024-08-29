import { MongoClient } from "mongodb";
import { Movie_Desc_Generator, Series_Desc_Generator } from "./movie_list.js";

async function insert(name) {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    client.connect();
    const db = client.db('Movies');
    const collection = db.collection('Movies_List');
    try {
        const list = await Movie_Desc_Generator(name);
        await collection.insertOne(list);
        return list.ID;

    } finally {

        await client.close();

    }
}
async function insertTv(name) {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    client.connect();
    const db = client.db('Movies');
    const collection = db.collection('Movies_List');
    try {
        const list = await Series_Desc_Generator(name);
        await collection.insertOne(list);
        return list.ID;

    } finally {

        await client.close();

    }
}


async function find(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    client.connect();
    const db = client.db('Movies');
    const collection = db.collection('Movies_List');
    try {
        const findResult = await collection.find({ name: { $regex: name, $options: "i" } }).toArray();
        return findResult;
    }
    finally {
        await client.close();
    }
}
async function findByID(ID) {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    client.connect();
    const db = client.db('Movies');
    const collection = db.collection('Movies_List');
    try {
        ID = parseInt(ID, 10);
        const findResult = await collection.find({ ID: ID }).toArray();
        return findResult;
    }
    finally {
        await client.close();
    }
}

async function findAll() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
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

async function Marvel_insert(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection1 = db.collection('Movies_List');
        const collection2 = db.collection('Marvvel_List');
        const list = await Movie_Desc_Generator(name);

        await collection1.insertOne(list);
        await collection2.insertOne(list);
    } finally {
        await client.close();
    }
}

async function Marvel_find() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('Marvvel_List');
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        await client.close();
    }
}

async function topFavoriteMovies_Insert(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection1 = db.collection('Movies_List');
        const collection = db.collection('TopFavoriteMovies_List');
        const list = await Movie_Desc_Generator(name);
        await collection.insertOne(list);
        await collection1.insertOne(list);
    } finally {
        await client.close();
    }
}

async function topFavoriteMovies_Find() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('TopFavoriteMovies_List');
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        await client.close();
    }
}

async function harryPotterMovies_Insert(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection1 = db.collection('Movies_List');
        const collection = db.collection('HarryPotterMovies_List');
        const list = await Movie_Desc_Generator(name);
        await collection.insertOne(list);
        await collection1.insertOne(list);
    } finally {
        await client.close();
    }
}

async function harryPotterMovies_Find() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('HarryPotterMovies_List');
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        await client.close();
    }
}

async function kidsFavoriteMovies_Insert(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('KidsFavoriteMovies_List');
        const collection1 = db.collection('Movies_List');
        const list = await Movie_Desc_Generator(name);
        await collection.insertOne(list);
        await collection1.insertOne(list);
    } finally {
        await client.close();
    }
}

async function kidsFavoriteMovies_Find() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('KidsFavoriteMovies_List');
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        await client.close();
    }
}

async function Sci_Fi_Insert(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection1 = db.collection('Movies_List');
        const collection = db.collection('Sci_Fi_List');
        const list = await Movie_Desc_Generator(name);
        await collection.insertOne(list);
        await collection1.insertOne(list);
    } finally {
        await client.close();
    }
}

async function Sci_Fi_Find() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('Sci_Fi_List');
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        await client.close();
    }
}

async function Pirates_Insert(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection1 = db.collection('Movies_List');
        const collection = db.collection('Pirates_List');
        const list = await Movie_Desc_Generator(name);
        await collection.insertOne(list);
        await collection1.insertOne(list);
    } finally {
        await client.close();
    }
}

async function Pirates_Find() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('Pirates_List');
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        await client.close();
    }
}

async function Disney_insert(name) {

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');

        const collection = db.collection('Disney_List');
        const collection1 = db.collection('Movies_List');
        const list = await Movie_Desc_Generator(name);
        await collection.insertOne(list);
        await collection1.insertOne(list);
    } finally {
        await client.close();
    }
}

async function Disney_Find() {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        await client.connect();
        const db = client.db('Movies');
        const collection = db.collection('Disney_List');
        const findResult = await collection.find({}).toArray();
        return findResult;
    } finally {
        await client.close();
    }
}
export { insert, insertTv, find, findByID, findAll, Marvel_find, topFavoriteMovies_Find, harryPotterMovies_Find, kidsFavoriteMovies_Find, Sci_Fi_Find, Pirates_Find, Disney_Find };