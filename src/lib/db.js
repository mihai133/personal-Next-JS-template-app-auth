import "server-only"

import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Please set the DB_URI environment variable");
}

const client = new MongoClient(process.env.DB_URI, {
  serverAPI : {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getDB(dbName) {
  try {
    await client.connect();
    console.log(">>>> Connected to MongoDB <<<<<");
    return client.db(dbName);
  } catch (error) {
    console.log(">>>> Error connecting to MongoDB <<<<<");
    console.log(error);
  }
}

export async function getCollection(collectionName) {
 const db = await getDB("next_blog_db");

 if(db) return db.collection(collectionName);

 return null;
}