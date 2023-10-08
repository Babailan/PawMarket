import { redirect } from "@sveltejs/kit";

export const ssr = false;

export async function load({ cookies, fetch }) {
  try {
    const user = cookies.get("user");
    if (!user) {
      throw redirect(307, "/");
    }
    const result = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        _id: JSON.parse(user)._id,
      }),
    });

    const jsonresult = await result.json();

    return { result: jsonresult.cart };
  } catch (error) {
    return {};
  }
}
