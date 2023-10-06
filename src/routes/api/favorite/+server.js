import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";

export async function GET() {
  try {
    const client = await connect();
    const collection = client.db("pawmarket").collection("breeds");

    const result = await collection
      .find()
      .sort({ favorite: -1 })
      .limit(10)
      .toArray();

    client.close();

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
