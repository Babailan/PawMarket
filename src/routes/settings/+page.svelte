<script>
  // Destructure imports
  import { user } from "src/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Input from "components/input/SettingsInput.svelte";

  // Group related variables
  let email = "";
  let current_password = "";
  let new_password = "";
  let lastname = "";
  let firstname = "";
  let username = "";

  let load = false;

  // Add comments for clarity
  $: {
    if (!$user && load) {
      goto("/");
    }
  }

  onMount(() => {
    document.title = "Settings | Pawmarket";
    if (!$user) {
      goto("/");
    }
    if ($user) {
      email = $user.email;
      lastname = $user.lastname;
      firstname = $user.firstname;
      username = $user.username;
    } else {
      email = "";
      lastname = "";
      firstname = "";
      username = "";
    }
    load = true;
  });
</script>

<div class="flex flex-col mt-20 gap-3 w-fit m-auto md:flex-row">
  <div class="max-w-xs">
    <h1 class="font-semibold text-lg">Personal Information</h1>
    <p class="text-gray-500">
      Use a permanent address where you can receive mail.
    </p>
  </div>
  <div class="flex flex-col w-full max-w-sm">
    <div class="flex gap-5">
      <Input bind:value={firstname} label={"First Name"} />
      <Input bind:value={lastname} label={"Last Name"} />
    </div>
    <Input bind:value={email} label={"Email"} />
    <Input bind:value={username} label={"Username"} />
    <button
      class="bg-sky-500 hover:bg-sky-600 p-2 text-white rounded-lg text-lg"
      >Save</button
    >
    <hr class="my-5" />
    <Input bind:value={current_password} label={"Current Password"} />
    <Input bind:value={new_password} label={"New Password"} />
    <button
      class="bg-sky-500 hover:bg-sky-600 p-2 text-white rounded-lg text-lg"
      >Update Password</button
    >
    <button
      class="bg-red-600 hover:bg-red-700 p-2 text-white rounded-lg text-lg my-10"
      >Delete Account</button
    >
  </div>
</div>
