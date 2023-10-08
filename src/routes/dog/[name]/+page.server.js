export async function load({ params, fetch }) {
  const { name } = params;

  return {
    dog_name: name,
    streamed: {
      breed: new Promise(async (resolve) => {
        const req = await fetch("/api/breed", {
          method: "POST",
          body: JSON.stringify({
            name,
          }),
        });
        const breed = await req.json();
        resolve(breed);
      }),
    },
  };
}
