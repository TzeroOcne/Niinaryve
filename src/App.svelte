<script lang="ts">
  import './app.css';

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
  <div class="grid grid-cols-2 w-32 gap-y-2 gap-x-8">
    <label for="base">Base</label>
    <input bind:value={baseColor} type="color" name="base" id="">
    <label for="member">Member</label>
    <input bind:value={memberColor} type="color" name="member" id="">
    <label for="Admin">Admin</label>
    <input bind:value={adminColor} type="color" name="admin" id="">
  </div>
</main>

<style>
</style>
