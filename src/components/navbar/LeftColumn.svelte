<script>
  export let searchValue;
  import { onMount } from "svelte";
  import { user } from "src/stores";
  import { createPopper } from "@popperjs/core";
  import { goto } from "$app/navigation";
  let userToolTip, userProfile;
  let showToolTip = false;
  let popperInstance;
  import NavbarSearch from "./NavbarSearch.svelte";

  function toolTipListener(e) {
    if (
      !document.querySelector("#tooltip").contains(e.target) &&
      !userProfile.contains(e.target)
    ) {
      removeToolTipListener();
    }
  }
  function removeToolTipListener() {
    showToolTip = false;
    window.removeEventListener("click", toolTipListener);
  }
  onMount(() => {
    popperInstance = createPopper(userProfile, userToolTip, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    });

    return () => {
      window.removeEventListener("click", toolTipListener);
    };
  });
</script>

<div class="flex gap-2 justify-end items-center">
  <div class="sm:block hidden">
    <NavbarSearch bind:searchValue />
  </div>
  <button
    on:click={() => {
      if ($user == undefined) {
        goto("/login");
      } else {
        goto("/cart");
      }
    }}
    class="flex justify-center items-center hover:bg-zinc-200 p-2 rounded-full"
    title={"List of pets"}
  >
    <span class="material-symbols-outlined"> pets </span>
  </button>

  {#if $user == undefined}
    <div class="flex gap-3">
      <a href="/login" class="h-fit">Login</a>
      <a href="/sign-up" class="h-fit">Sign Up</a>
    </div>
  {:else}
    <button
      bind:this={userProfile}
      class="w-[40px] h-[40px] rounded-full overflow-hidden"
      on:click={async () => {
        showToolTip = true;
        await popperInstance.update();
        window.addEventListener("click", toolTipListener);
      }}><img src="/defaultprofile.jpg" alt="" /></button
    >
    <div
      bind:this={userToolTip}
      class="bg-white shadow-2xl max-w-xs w-[320px] text-sm z-10 py-2 flex flex-col rounded-md border-[0.1em] {showToolTip
        ? 'block'
        : 'hidden'} "
      id="tooltip"
      role="tooltip"
    >
      <div class="p-3">
        <p class="capitalize text-lg font-bold">
          {$user.username == ""
            ? $user.firstname + " " + $user.lastname
            : $user.username}
        </p>
        <p class="text-zinc-500">
          {$user.email}
        </p>
      </div>
      <hr />
      <a
        class="flex p-3 items-center hover:bg-zinc-100 transition-all delay-100"
        href="/settings"
        on:click={removeToolTipListener}
      >
        <span class="material-symbols-outlined mr-2"> settings </span>Account
        settings
      </a>
      <a
        class="flex p-3 items-center hover:bg-zinc-100 transition-all delay-100"
        href="/Privacy"
        on:click={removeToolTipListener}
      >
        <span class="material-symbols-outlined mr-2"> lock </span>Privacy
      </a>
      <a
        class="flex p-3 items-center hover:bg-zinc-100 transition-all delay-100"
        href="/settings"
        on:click={removeToolTipListener}
      >
        <span class="material-symbols-outlined mr-2"> gavel </span>Terms
      </a>
      <button
        on:click={() => {
          user.clearUser();
          removeToolTipListener();
        }}
        class="flex p-3 items-center hover:bg-zinc-100 transition-all"
        ><span class="material-symbols-outlined mr-2"> logout </span>Sign Out</button
      >
    </div>
  {/if}
</div>
