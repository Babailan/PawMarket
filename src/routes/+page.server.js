export async function load({ fetch }) {
  return {
    streamed: {
      favorite: new Promise(async (resolve) => {
        const data = await (
          await fetch("/api/favorite", { method: "get" })
        ).json();
        resolve(data);
      }),
    },
  };
}
