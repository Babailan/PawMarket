<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
  import "../app.css";
  import { user } from "../stores";
  import { page } from "$app/stores";
  user.setUser();
</script>

<main class="p-10 max-w-7xl m-auto">
  {#if !($page.url.pathname == "/sign-up" || $page.url.pathname == "/login")}
    <Navbar />
  {/if}

  <div class="min-h-screen">
    <slot />
  </div>

  <Footer />
</main>
