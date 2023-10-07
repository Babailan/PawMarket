export async function load({ params, fetch }) {
  const { q } = params;
  const req = await fetch("/api/search", {
    method: "post",
    body: JSON.stringify({
      q: q,
    }),
  });
  const data = await req.json();
  return { q, result: data.result };
}
