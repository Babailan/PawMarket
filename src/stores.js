import { writable } from "svelte/store";
import cookie from "js-cookie";

function account() {
  const { set, subscribe, update } = writable(undefined);
  return {
    subscribe,
    update,
    setUser: () => {
      const user = cookie.get("user");
      if (user != undefined) {
        set(JSON.parse(user));
      }
    },
    set,
    clearUser: () => {
      update((v) => undefined);
      cookie.remove("user");
    },
  };
}

export let user = account();
