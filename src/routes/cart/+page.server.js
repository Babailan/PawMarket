import { redirect } from "@sveltejs/kit";

export async function load({ cookies, fetch }) {
  try {
    const user = cookies.get("user");
    if (!user) {
      throw redirect(307, "/");
    }
    return {
      streamed: {
        result: new Promise(async (resolve) => {
          const result = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({
              _id: JSON.parse(user)._id,
            }),
          });

          const jsonresult = await result.json();
          resolve(jsonresult.cart);
        }),
      },
    };
  } catch (error) {
    return {};
  }
}
