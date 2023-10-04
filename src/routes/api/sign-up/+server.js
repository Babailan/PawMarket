import { json } from "@sveltejs/kit";
import { MongoClient } from "mongodb";

export async function POST({ request, cookies }) {
  const { email, username, password, fullname } = await request.json();

  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);
  await client.connect();
  const database = client.db("pawmarket");
  const usersCollection = database.collection("users");

  const exist = await usersCollection.findOne({ email });

  if (!!exist) {
    return json({ exist: true, acknowledge: 0, id: null });
  } else {
    const submit = await usersCollection.insertOne({
      email,
      password,
      fullname,
      username,
    });
    cookies.set(
      "user",
      JSON.stringify({
        email,
        password,
        fullname,
        username,
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
}
