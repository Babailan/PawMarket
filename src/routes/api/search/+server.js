import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";

export async function POST({ request }) {
  try {
    const { q } = await request.json();
    const regexQuery = new RegExp(`${q}`, "ig");

    const client = await connect();
    const collection = client.db("pawmarket").collection("breeds");

    // Perform a search for dog breeds
    const searchResults = await collection
      .find({ dog_name: regexQuery })
      .limit(30)
      .toArray();

    // Close the MongoDB connection
    client.close();

    // Return the search results as JSON
    return json({ result: searchResults });
  } catch (error) {
    // Handle errors
    console.error(error);
    return json(
      { error: "An error occurred while processing your request.", result: [] },
      500
    );
  }
}
