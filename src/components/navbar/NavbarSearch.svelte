<script>
  export let search;
  let inputFocus = false;
</script>

<div
  class="md:flex justify-center w-full border-gray-300 hidden {inputFocus &&
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
