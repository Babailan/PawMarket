<script>
  import Footer from "components/footer/Footer.svelte";
  import "../app.css";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { user } from "../stores";
  import { page } from "$app/stores";
  import Navbar from "components/navbar/Navbar.svelte";

  user.setUser();
</script>

<main class="md:p-10 p-5 max-w-6xl m-auto">
  {#if !($page.url.pathname == "/sign-up" || $page.url.pathname == "/login")}
    <Navbar />
  {/if}

  <div class="min-h-screen relative">
    <slot />
  </div>
  <Footer />
</main>
