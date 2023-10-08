export async function load({ params, fetch }) {
  const { q } = params;

  return {
    q,
    streamed: {
      result: new Promise(async (resolve) => {
        const req = await fetch("/api/search", {
          method: "post",
          body: JSON.stringify({
            q: q,
          }),
        });
        const data = await req.json();
        resolve(data.result);
      }),
    },
  };
}
