<script>
  import { validateEmail } from "../../libs/validation/validateEmail";
  import { goto } from "$app/navigation";
  import { user } from "../../stores";
  import { onMount } from "svelte";
  onMount(() => {
    document.title = "Sign Up | Pawmarket";
    if ($user != undefined) {
      goto("/");
    }
  });
  let valid = true;
  let email = "babailanxx@gmail.com";
  let emailError = "";
  let password = "ronnelbabailan";
  let passwordError = "";
  let username = "Rongrong";
  let usernameError = "";
  let fullname = "Ronnel Babailan Dilao";
  let fullnameError = "";

  async function submit() {
    if (!validateEmail(email)) {
      emailError = "Email is invalid.";
      valid = false;
    }
    if (password.length < 7) {
      passwordError = "Password must be greater than 7";
      valid = false;
    }
    if (email == "") {
      emailError = "Email is required.";
      valid = false;
    }

    if (password == "") {
      passwordError = "Password is required.";
      valid = false;
    }
    if (fullname == "") {
      fullnameError = "Fullname is required.";
      valid = false;
    }
    if (username == "") {
      usernameError = "Username is required.";
      valid = false;
    }

    if (!validateEmail(email)) {
      emailError = "Email is invalid.";
      valid = false;
    }
    if (password.length < 7) {
      passwordError = "Password must be greater than 7";
      valid = false;
    }
    if (!valid) {
      return;
    }
    const request = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify({
        fullname,
        username,
        email,
        password,
      }),
    });
    const { exist, acknowledge } = await request.json();
    if (exist) {
      emailError = "Email already exists.";
    }
    if (acknowledge) {
      user.setUser();
      goto("/");
    }
  }
</script>

<div class="flex justify-center items-center gap-3">
  <div>
    <div
      class="flex flex-col p-10 w-[390px] gap-2 border-[0.1em] border-gray-300"
    >
      <img src="/pawmarket.png" alt="pawmarket logo" />
      <h1 class="text-center text-sm text-gray-500 font-semibold">
        Sign up to see dogs and accessories in our shop.
      </h1>

      <button
        class="text-sm text-center text-white bg-sky-600 rounded-md p-2 font-semibold flex justify-center"
      >
        <img
          src="/facebook_white.png"
          width="20px"
          alt="facebook logo"
          class="mr-2"
        />
        Log in with Facebook
      </button>

      <div class="flex gap-2 flex-col text-sm">
        <!-- EMAIL INPUT -->
        <input
          class={`border-gray-300 focus:rounded-none outline-none border-[0.1em] p-2 ${
            emailError != ""
              ? "border-red-700 text-red-600 placeholder:text-red-600"
              : ""
          }`}
          bind:value={email}
          type="text"
          placeholder="Email"
          on:input={() => (emailError = "")}
        />
        {#if emailError != ""}
          <small class="text-red-600">{emailError}</small>
        {/if}

        <!-- PASSWORD INPUT -->
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
        <!-- FULLNAME INPUT -->
        <input
          class={`border-gray-300 focus:rounded-none outline-none border-[0.1em] p-2 ${
            fullnameError != ""
              ? "border-red-700 text-red-600 placeholder:text-red-600"
              : ""
          }`}
          bind:value={fullname}
          type="text"
          placeholder="Fullname"
          on:input={() => (fullnameError = "")}
        />
        {#if fullnameError != ""}
          <small class="text-red-600">{fullnameError}</small>
        {/if}
        <!-- USERNAME INPUT -->
        <input
          class={`border-gray-300 focus:rounded-none outline-none border-[0.1em] p-2 ${
            usernameError != ""
              ? "border-red-700 text-red-600 placeholder:text-red-600"
              : ""
          }`}
          bind:value={username}
          type="text"
          placeholder="Username"
          on:input={() => (usernameError = "")}
        />
        {#if usernameError != ""}
          <small class="text-red-600">{usernameError}</small>
        {/if}
      </div>

      <div class="flex flex-col gap-2 mt-2">
        <div class="text-gray-600 text-xs text-center">
          By signing up, you agree to our
          <a href="/terms" class="text-sky-500">Terms</a> ,
          <a href="/privacy" class="text-sky-500"> Privacy Policy </a>
          and <a href="/cookies" class="text-sky-500">Cookies Policy</a>.
        </div>
        <button
          on:click={submit}
          class="cursor-pointer font-semibold p-2 text-center bg-sky-500 text-white rounded-md"
        >
          Sign up
        </button>
      </div>
    </div>

    <div class="border-[0.1em] border-gray-300 mt-5">
      <p class="text-center p-5 text-sm">
        Already have an account? <a href="/login" class="text-sky-600">Log in</a
        >
      </p>
    </div>
  </div>
</div>
