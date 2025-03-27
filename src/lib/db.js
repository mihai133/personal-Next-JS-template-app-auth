import "server-only";

import { MongoClient, ServerApiVersion } from "mongodb";

// Connection configuration
// Global variable to store the cached client

if (!process.env.DB_URI) {
  throw new Error("Please set the DB_URI environment variable");
}

const options = {
  serverAPI: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
};

// Use a more generic approach to access the global object
let globalObject = global;

if (!globalObject.mongo) {
  globalObject.mongo = {
    client: null,
    conn: null,
  };
}

// Function to create a new client and connection promise
function createMongoClient() {
  const client = new MongoClient(process.env.DB_URI, options);
  const conn = client
    .connect()
    .then((client) => {
      console.log(">>>> Connected to MongoDB <<<<<");
      return client;
    })
    .catch((err) => {
      console.error(">>>> Error connecting to MongoDB <<<<<", err);
      throw err;
    });

  return { client, conn };
}

// Get or create the MongoDB client
export function getMongoClient() {
  if (!globalObject.mongo.client) {
    globalObject.mongo = createMongoClient();
  }
  return globalObject.mongo;
}

// Get database instance
async function getDB(dbName) {
  const { conn } = getMongoClient();
  const client = await conn;
  return client.db(dbName);
}

// Get collection
export async function getCollection(collectionName) {
  const db = await getDB("next_blog_db");
  return db.collection(collectionName);
}

// Handle graceful shutdown (optional, for production environments)
const gracefulShutdown = () => {
  const { client } = getMongoClient();
  if (client) {
    client
      .close(true)
      .then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      })
      .catch((err) => {
        console.error("Error closing MongoDB connection", err);
        process.exit(1);
      });
  }
};

// Listen for process termination signals
if (process.env.NODE_ENV === "production") {
  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
}
