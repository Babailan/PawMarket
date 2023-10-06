import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";

export async function POST({ request }) {
  try {
    const { name } = await request.json();

    const client = await connect();
    const collection = client.db("pawmarket").collection("breeds");

    const result = await collection.findOne({ dog_name: name });

    if (!result) {
      return json(
        {
          error: "Breed not found.",
        },
        404
      );
    }
    console.log(result);

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
