import { MongoClient } from "mongodb";

export async function connect() {
  try {
    const url = "mongodb://localhost:27017";
    const init = new MongoClient(url);
    const client = await init.connect();
    return client;
  } catch (error) {
    throw error;
  }
}
