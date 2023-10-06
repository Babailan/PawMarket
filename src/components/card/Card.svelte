<script>
  export let dog_name;
  export let price;
  export let image;
</script>

<div>
  <img src={image} alt={dog_name} />
  <h1>{dog_name}</h1>
  <p>{price}</p>
  <button>Buy now</button>
</div>
