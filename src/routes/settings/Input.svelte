<script>
  export let label;
  export let value;
</script>

<div class="mb-3">
  <h1 class="font-semibold mb-2">{label}</h1>
  <input
    type=""
    class="outline-none border-[0.1em] border-gray-300 px-3 py-2 focus:border-sky-700 rounded-md w-full max-w-sm"
    bind:value
  />
</div>
