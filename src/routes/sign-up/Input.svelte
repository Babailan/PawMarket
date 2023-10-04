<script>
  export let value;
  export let error;
  export let placeholder;
</script>

<input
  class={`border-gray-300 focus:rounded-none outline-none border-[0.1em] p-2 ${
    error != "" ? "border-red-700 text-red-600 placeholder:text-red-600" : ""
  }`}
  bind:value
  type="text"
  {placeholder}
  on:input={() => (error = "")}
/>
{#if error != ""}
  <small class="text-red-600">{error}</small>
{/if}
