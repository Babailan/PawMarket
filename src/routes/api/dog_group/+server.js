import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";

export async function POST({ request }) {
  const { group } = await request.json();
  try {
    const client = await connect();
    const collection = client.db("pawmarket").collection("breeds");

    const result = await collection.find({ breed_group: group }).toArray();

    return json(result);
  } catch (error) {
    return json(
      {
        error: "An error occurred while processing your request.",
      },
      500
    );
  }
}
