import { json } from "@sveltejs/kit";
import { MongoClient } from "mongodb";

export async function POST({ request, cookies }) {
  const { email, password } = await request.json();

  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);
  await client.connect();
  const database = client.db("pawmarket");
  const usersCollection = database.collection("users");
  const exist = await usersCollection.findOne({ email });

  if (!!exist) {
    if (password == exist.password) {
      cookies.set("user", JSON.stringify(exist), {
        httpOnly: false,
        path: "/",
      });
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
}
