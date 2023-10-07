import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect.js";
import bcrypt from "bcrypt";

export async function POST({ request, cookies }) {
  try {
    const { email, password } = await request.json();
    const client = await connect();
    const database = client.db("pawmarket");
    const usersCollection = database.collection("users");
    const exist = await usersCollection.findOne({ email });

    if (!!exist) {
      const passwordMatch = await bcrypt.compare(password, exist.password);

      if (passwordMatch) {
        // Set specific user information as cookies
        const { email, username, _id, lastname, firstname } = exist;
        cookies.set(
          "user",
          JSON.stringify({ email, username, _id, lastname, firstname }),
          {
            httpOnly: false,
            path: "/",
          }
        );
        return json({ exist: true, acknowledge: 1 });
      } else {
        return json({ exist: true, acknowledge: 0 });
      }
    } else {
      return json({
        exist: false,
        acknowledge: 0,
      });
    }
  } catch (error) {
    return json(
      { error: "An error occurred while processing your request." },
      500
    );
  }
}
