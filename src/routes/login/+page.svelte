<script>
  import { validateEmail } from "lib/validation/validateEmail";
  import { goto } from "$app/navigation";
  import { user } from "../../stores";
  import { onMount } from "svelte";
  onMount(() => {
    document.title = "Log in | Pawmarket";
    if ($user != undefined) {
      goto("/");
    }
  });
  let valid = true;
  let email = "babailanxx@gmail.com";
  let emailError = "";
  let password = "ronnelbabailan";
  let passwordError = "";

  async function submit() {
    if (!validateEmail(email)) {
      emailError = "Email is invalid.";
      valid = false;
    }
    if (email == "") {
      emailError = "Email is empty.";
      valid = false;
    }
    if (password == "") {
      passwordError = "Password is empty.";
      valid = false;
    }
    if (!valid) {
      valid = true;
      return;
    }
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!data.exist) {
      emailError = "Email doesn't exist.";
      return;
    }
    if (data.exist && data.acknowledge == 0) {
      passwordError = "Password is incorrect.";
      return;
    }
    if (data.acknowledge == 1) {
      user.setUser();
      goto("/");
    }
  }
</script>

<div class="flex justify-center items-center gap-3">
  <!-- LEFT COL -->
  <div>
    <img src="/login-3.jpg" class="max-w-md" alt="doggy" />
  </div>
  <!-- RIGHT COL -->
  <div>
    <div
      class="flex flex-col p-10 w-[390px] gap-2 border-[0.1em] border-gray-300"
    >
      <img src="/pawmarket.png" alt="pawmarket logo" />
      <h1 class="text-center text-sm text-gray-500 font-semibold">
        Sign up to see dogs and accessories in our shop.
      </h1>
      <div class="flex gap-2 flex-col text-sm">
        <input
          class={`border-gray-300 focus:rounded-none outline-none border-[0.1em] p-2 ${
            emailError != ""
              ? "border-red-700 text-red-600 placeholder:text-red-600"
              : ""
          }`}
          bind:value={email}
          type="text"
          placeholder="Email"
          on:input={() => {
            emailError = "";
            passwordError = "";
          }}
        />
        {#if emailError != ""}
          <small class="text-red-600">{emailError}</small>
        {/if}
        <input
          class={`border-gray-300 focus:rounded-none outline-none border-[0.1em] p-2 ${
            passwordError != ""
              ? "border-red-700 text-red-600 placeholder:text-red-600"
              : ""
          }`}
          bind:value={password}
          type="password"
          placeholder="Password"
          on:input={() => (passwordError = "")}
        />
        {#if passwordError != ""}
          <small class="text-red-600">{passwordError}</small>
        {/if}
        <button
          on:click={submit}
          class="cursor-pointer font-semibold p-2 text-center bg-sky-500 text-white rounded-md"
        >
          Log in
        </button>
      </div>

      <small class="text-center">OR</small>
      <div
        class="text-sm text-center text-sky-800 font-semibold flex justify-center"
      >
        <button class="flex cursor-pointer gap-1">
          <img src="/facebook.png" width="20px" alt="" />
          Log in with Facebook
        </button>
      </div>
    </div>
    <div class="border-[0.1em] border-gray-300 mt-5">
      <p class="text-center p-5 text-sm">
        Don't have an account? <a href="/sign-up" class="text-sky-600"
          >Sign Up</a
        >
      </p>
    </div>
  </div>
</div>
