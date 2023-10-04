<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
  import "../app.css";
  // import Swiper and modules styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { user } from "../stores";
  import { page } from "$app/stores";

  user.setUser();
</script>

<main class="p-10 max-w-6xl m-auto">
  {#if !($page.url.pathname == "/sign-up" || $page.url.pathname == "/login")}
    <Navbar />
  {/if}

  <div class="min-h-screen">
    <slot />
  </div>
  <!-- <EditUserNameModal /> -->
  <Footer />
</main>
