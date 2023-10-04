<script>
  import { onMount } from "svelte";
  import { user } from "../stores";
  import { createPopper } from "@popperjs/core";
  import { goto } from "$app/navigation";
  let search = "";
  let inputFocus = false;
  let userToolTip, userProfile;
  let showToolTip = false;
  let popperInstance;

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

<nav class="grid grid-cols-3">
  <!-- left col -->
  <div>
    <a class="flex items-center cursor-pointer w-fit" href="/">
      <img src="/favicon.png" width="50px" alt="Logo PNG" />
      <img src="/pawmarket.png" width="160px" alt="Logo PNG" />
    </a>
  </div>
  <!-- center col -->
  <div
    class="flex justify-center border-gray-300 {inputFocus &&
      'border-gray-800'} border-2 rounded-lg overflow-hidden px-5 py-2"
  >
    <div class="w-full flex items-center">
      <input
        class="w-full outline-none"
        placeholder={!inputFocus ? "Search for pets & accessories" : ""}
        bind:value={search}
        on:focusin={() => {
          inputFocus = true;
        }}
        on:focusout={() => {
          inputFocus = false;
        }}
      />
      <span
        class="material-symbols-outlined text-gray-400 {inputFocus &&
          'text-gray-800'} cursor-pointer"
      >
        search
      </span>
    </div>
  </div>
  <!-- right col -->
  <div class="flex gap-2 justify-end items-center">
    <button
      on:click={() => {
        if ($user == undefined) {
          goto("/login");
        } else {
          goto("/cart");
        }
      }}
      class="flex justify-center items-center"
    >
      <span class="material-symbols-outlined mr-2"> shopping_cart </span>
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
        on:click={async (e) => {
          showToolTip = true;
          await popperInstance.update();
          window.addEventListener("click", toolTipListener);
        }}><img src="/defaultprofile.jpg" alt="" /></button
      >

      <div
        bind:this={userToolTip}
        class="bg-slate-100 w-[320px] p-5 gap-2 flex flex-col rounded-md {showToolTip
          ? 'block'
          : 'hidden'}"
        id="tooltip"
        role="tooltip"
      >
        <p class="font-semibold">{$user.fullname}</p>
        <hr />
        <a
          class="flex hover:bg-slate-500 hover:text-white p-2 rounded-lg"
          href="/settings"
          on:click={removeToolTipListener}
        >
          <span class="material-symbols-outlined mr-2"> settings </span>Settings
        </a>
        <button
          on:click={() => {
            user.clearUser();
            removeToolTipListener();
          }}
          class="flex hover:bg-slate-500 hover:text-white p-2 rounded-lg"
          ><span class="material-symbols-outlined mr-2"> logout </span>Log Out</button
        >
        <small>
          <a href="/terms">Terms</a>
          .
          <a href="/privacy">Privacy</a>
        </small>
      </div>
    {/if}
  </div>
</nav>
