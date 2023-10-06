import { writable } from "svelte/store";
import cookie from "js-cookie";

function createUser() {
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
      update(() => undefined);
      cookie.remove("user");
    },
  };
}

function createLoader() {
  const { set, subscribe, update } = writable(undefined);
  return {
    set,
    subscribe,
    update,
    enable: () => {
      set(true);
    },
    disable: () => {
      set(false);
    },
  };
}

export let user = createUser();
export let loader = createLoader();
