<script lang="ts">
  import './index.css';

  let baseColor: string = '#000000';
  let memberColor: string = '#000000';
  let adminColor: string = '#000000';

  $: {
    console.log({
      baseColor,
      memberColor,
      adminColor,
    });

  }
</script>

<main>
  <input bind:value={baseColor} type="color" name="" id="">
  <input bind:value={memberColor} type="color" name="" id="">
  <input bind:value={adminColor} type="color" name="" id="">
</main>

<style>
</style>
