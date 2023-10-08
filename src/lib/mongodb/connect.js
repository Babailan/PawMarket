import { MongoClient } from "mongodb";
import { dev } from "$app/environment";

export async function connect() {
  try {
    const url = false
      ? "mongodb://localhost:27017"
      : "mongodb+srv://pawmarketdev:xVwOrOJiSgCkZp6E@cluster0.tcq95yi.mongodb.net/";
    const init = new MongoClient(url);
    const client = await init.connect();
    return client;
  } catch (error) {
    throw error;
  }
}
