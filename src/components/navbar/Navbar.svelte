<script>
  import LeftColumn from "./LeftColumn.svelte";
  import NavbarSearch from "./NavbarSearch.svelte";
  import RightColumn from "./RightColumn.svelte";
  let searchValue = "";
</script>

<nav class="flex justify-between gap-20 items-center">
  <RightColumn />
  <LeftColumn bind:searchValue />
</nav>

<div class="mt-3 sm:hidden">
  <NavbarSearch bind:searchValue />
</div>
