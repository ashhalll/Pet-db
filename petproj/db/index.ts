import { Client } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve the database connection string from environment variables
const connectionString: string | undefined = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

console.log("DB string: ", connectionString);

// Function to create a new database client
export const createClient = (): Client => {
  const client = new Client({
    connectionString,
  });
  client.connect()
    .then(() => console.log("Created a new database client and connected successfully"))
    .catch((err) => {
      console.error("Error connecting with the new database client:", err);
      throw err;
    });
  return client;
};

// Create and export a shared database client instance
export const db = new Client({ connectionString });
db.connect()
  .then(() => console.log("Connected to the shared database client successfully"))
  .catch((err) => {
    console.error("Error connecting to the shared database client:", err);
    throw err;
  });
