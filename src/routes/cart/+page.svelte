<script>
  import { afterUpdate } from "svelte";
  import { user } from "../../stores";
  import { goto } from "$app/navigation";
  let n = 0;
  afterUpdate(() => {
    document.title = "Dog Cart | Pawmarket";
    if ($user == undefined) {
      goto("/");
    }
  });
</script>

<h1>{n}</h1>
<button on:click={() => n++}>HELLO</button>
