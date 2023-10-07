<script>
  import { page } from "$app/stores";
</script>

<div class="min-h-screen font-bold flex items-center justify-center">
  <span class="material-symbols-outlined"> report </span>
  <h1>
    {$page.status}: {$page.error.message}
  </h1>
</div>
