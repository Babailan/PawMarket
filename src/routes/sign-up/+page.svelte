<script>
  // Destructure imports
  import { validateEmail } from "lib/validation/validateEmail";
  import { goto } from "$app/navigation";
  import { user } from "src/stores";
  import { onMount } from "svelte";
  import Input from "components/input/RegisterInput.svelte";

  onMount(() => {
    document.title = "Sign Up | Pawmarket";
    if ($user !== undefined) {
      goto("/");
    }
  });

  let valid = true;
  let email = "";
  let emailError = "";
  let password = "";
  let passwordError = "";
  let firstname = "";
  let firstnameError = "";
  let lastname = "";
  let lastnameError = "";

  async function submit() {
    if (!validateEmail(email)) {
      emailError = "Email is invalid.";
      valid = false;
    }
    if (password.length < 7) {
      passwordError = "Password must be greater than 7";
      valid = false;
    }
    if (email === "") {
      emailError = "Email is required.";
      valid = false;
    }

    if (password === "") {
      passwordError = "Password is required.";
      valid = false;
    }

    if (firstname === "") {
      firstnameError = "Firstname is required.";
      valid = false;
    }
    if (lastname === "") {
      lastnameError = "Lastname is required.";
      valid = false;
    }

    if (!valid) {
      valid = true;
      return;
    }

    const request = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        lastname,
        firstname,
      }),
    });

    try {
      const { exist, acknowledge } = await request.json();

      if (exist) {
        emailError = "Email already exists.";
      }

      if (acknowledge) {
        user.setUser();
        goto("/");
      }
    } catch (error) {
      console.error("Error:", error);
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
        <Input
          bind:value={email}
          bind:error={emailError}
          placeholder={"Email"}
          type={"email"}
        />
        <Input
          bind:value={password}
          bind:error={passwordError}
          placeholder={"Password"}
          type={"password"}
        />

        <Input
          bind:value={firstname}
          bind:error={firstnameError}
          placeholder={"First Name"}
        />
        <Input
          bind:value={lastname}
          bind:error={lastnameError}
          placeholder={"Last Name"}
        />
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
