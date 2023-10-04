<script>
  import { user } from "../stores";
  let value = "";
  let error = "";
  function save() {
    if (value.length == 0) {
      error = "Username is required.";
      return;
    }
    if (value.length < 3) {
      error = "Username should not be less than 3";
      return;
    }
  }
</script>

{#if $user != undefined && $user.username == ""}
  <div
    class="fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-3 flex-col border-gray-400 rounded-md border-[0.1em] p-10"
  >
    <p class="font-semibold text-lg">Pick your username</p>
    <input
      type="text"
      placeholder="Username"
      bind:value
      class="outline-none py-2 px-3 border-[0.1em] border-gray-400 focus:border-sky-400 w-[320px] {error !=
      ''
        ? 'placeholder:text-red-500 text-red-500 border-red-600'
        : ''}"
      on:input={() => (error = "")}
    />
    <p class="text-red-600">{error}</p>
    <button
      class="p-2 bg-sky-500 hover:bg-sky-600 rounded-md text-white"
      on:click={save}>Save</button
    >
  </div>
{/if}
