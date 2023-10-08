export function load() {
  return {
    streamed: {
      three: new Promise((fulfil) => {
        setTimeout(() => {
          fulfil(3);
        }, 1000);
      }),
    },
  };
}
