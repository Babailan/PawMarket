export async function load(e) {
  const favorite = await (
    await e.fetch("/api/favorite", { method: "get" })
  ).json();

  return {
    headers: {
      "cache-control": "public,max-age=3600",
    },
    body: {
      favorite,
    },
  };
}
