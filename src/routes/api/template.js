import { json } from "@sveltejs/kit";
import { connect } from "lib/mongodb/connect";

export async function POST({ request }) {
  try {
    const { userId, itemData } = await request.json(); // Assuming you're sending userId and itemData in the request body.

    // Connect to MongoDB
    const client = await connect();
    const collection = client.db("pawmarket").collection("users");

    // Find the user by their ID
    const user = await collection.findOne({ _id: userId });

    if (!user) {
      return json({ error: "User not found" }, 404);
    }

    // Check if the user has a cart
    if (!user.cart) {
      user.cart = [];
    }

    // Check if the item already exists in the cart
    const itemExists = user.cart.some(
      (cartItem) => cartItem.itemId === itemData.itemId
    );

    if (itemExists) {
      return json({ error: "Item already exists in the cart" }, 400);
    }

    // Add item to the cart
    user.cart.push(itemData);

    // Update the user's cart
    await collection.updateOne({ _id: userId }, { $set: { cart: user.cart } });

    return json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    return json(
      { error: "An error occurred while processing your request.", result: [] },
      500
    );
  }
}
