import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect.js";
import bcrypt from "bcrypt";

export async function POST({ request, cookies }) {
  try {
    const { email, password, lastname, firstname } = await request.json();

    const fullname = firstname + lastname;

    const client = await connect();
    const database = client.db("pawmarket");
    const usersCollection = database.collection("users");

    const exist = await usersCollection.findOne({ email });

    if (!!exist) {
      return json({ exist: true, acknowledge: 0, id: null });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const submit = await usersCollection.insertOne({
        email,
        password: hashedPassword,
        fullname,
        username: "",
        lastname,
        firstname,
      });

      cookies.set(
        "user",
        JSON.stringify({
          email,
          password: hashedPassword,
          lastname,
          username: "",
          firstname,
          fullname,
          _id: submit.insertedId,
        }),
        { httpOnly: false, path: "/" }
      );

      return json({
        exist: false,
        acknowledge: submit.acknowledged,
        id: submit.insertedId,
      });
    }
  } catch (error) {
    return json(
      { error: "An error occurred while processing your request." },
      500
    );
  }
}
