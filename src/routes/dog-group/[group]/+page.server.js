export function load({ fetch, params }) {
  const { group } = params;
  return {
    group,
    streamed: {
      result: new Promise(async (resolve) => {
        const result = await fetch("/api/dog_group", {
          method: "POST",
          body: JSON.stringify({
            group,
          }),
        });
        const json = await result.json();
        resolve(json);
      }),
    },
  };
}
