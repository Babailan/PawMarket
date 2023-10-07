import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";
import { ObjectId } from "mongodb";

export async function POST({ request }) {
  try {
    const { _id, itemData } = await request.json();

    // Connect to MongoDB
    const client = await connect();
    const collection = client.db("pawmarket").collection("users");

    // Find the user by their ID
    const user = await collection.findOne({ _id: new ObjectId(_id) });

    if (!user) {
      return json({ error: "User not found" }, 404);
    }
    // Check if the user has a cart
    if (!user.cart) {
      user.cart = [];
    }

    // Check if the item already exists in the cart

    const itemExists = user.cart.some((cartItem) => {
      return cartItem._id == itemData._id;
    });

    if (itemExists) {
      return json({ error: "Item already exists in the cart" }, 400);
    }

    user.quantity = 0;
    user.cart.push(itemData);

    // Update the user's cart
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { cart: user.cart } }
    );

    return json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    // Handle errors
    console.log(error);
    return json(
      { error: "An error occurred while processing your request.", result: [] },
      500
    );
  }
}
