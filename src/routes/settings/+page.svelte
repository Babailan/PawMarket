<script>
  import { onMount } from "svelte";
  import { user } from "../../stores";
  let email, password, fullname, username;
  if ($user != undefined) {
    email = $user.email;
    password = $user.password;
    fullname = $user.fullname;
    username = $user.username;
  }
</script>

<div>
  <h1>Email :{email != undefined ? email : ""}</h1>
  <h1>Password :{password != undefined ? "*****" : ""}</h1>
  <h1>Full Name :{fullname != undefined ? fullname : ""}</h1>
  <h1>Username :{username != undefined ? username : ""}</h1>
</div>
