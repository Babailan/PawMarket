export async function load({ params, fetch }) {
  const { name } = params;
  const req = await fetch("/api/breed", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
  const breed = await req.json();
  return { breed };
}
