import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";

export async function GET({ request }) {
  const { breed_group } = await request.json();
  try {
    const client = await connect();
    const collection = client.db("pawmarket").collection("breeds");

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
