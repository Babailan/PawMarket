import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";
import { ObjectId } from "mongodb";

export async function POST({ request }) {
  try {
    const { _id } = await request.json();

    // Connect to MongoDB
    const client = await connect();
    const collection = client.db("pawmarket").collection("users");

    // Find the user by their ID
    const user = await collection.findOne({ _id: new ObjectId(_id) });

    if (!user) {
      return json({ error: "User not found" }, 404);
    }

    return json(user);
  } catch (error) {
    // Handle errors
    console.error(error);
    return json(
      { error: "An error occurred while processing your request.", result: [] },
      500
    );
  }
}
