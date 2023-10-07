import { MongoClient } from "mongodb";
import { browser, dev, building, version } from "$app/environment";
export async function connect() {
  try {
    const url = dev
      ? "mongodb://localhost:27017"
      : "mongodb+srv://pawmarketdev:xVwOrOJiSgCkZp6E@cluster0.tcq95yi.mongodb.net/";
    const init = new MongoClient(url);
    const client = await init.connect();
    return client;
  } catch (error) {
    throw error;
  }
}
