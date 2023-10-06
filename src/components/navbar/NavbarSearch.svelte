<script>
  export let searchValue;
</script>

<div class="border-zinc-300 border-[0.1em] flex items-center p-2 rounded-sm">
  <span class="material-symbols-outlined mr-2"> search </span>
  <input
    bind:value={searchValue}
    type="text"
    class="outline-none w-full"
    placeholder="Search"
    on:keyup={(e) => {
      if (e.code == "Enter") {
        console.log("YES");
      }
    }}
  />
</div>
