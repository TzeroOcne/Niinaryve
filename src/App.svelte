<script lang="ts">
  import { getStoreValue, store } from '$lib/extension/storage';
  import { DefaultAppConfig } from '@consts';
  import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
  import type { AppConfig } from '@types';
  import Fa from 'svelte-fa';
  import './app.css';

  const appConfig:AppConfig = {
    ...(DefaultAppConfig),
  };

  const resetConfig = () => {
    for (const key in appConfig) {
      appConfig[key] = DefaultAppConfig[key];
    }
  };

  const configLoader = (async () => {
    const storedConfig = await getStoreValue('config');
    for (const key in appConfig) {
      appConfig[key] = storedConfig[key] ?? appConfig[key];
    }
  })();

  $: {
    store({
      config: appConfig,
    });
  }
</script>

<main>
  {#await configLoader then}
  <div class="grid grid-cols-2 w-32 gap-y-2 gap-x-8 m-4">
    <label for="base">Base</label>
    <input bind:value={appConfig.baseColor} type="color" name="base" id="">
    <label for="member">Member</label>
    <input bind:value={appConfig.memberColor} type="color" name="member" id="">
    <label for="admin">Admin</label>
    <input bind:value={appConfig.adminColor} type="color" name="admin" id="">
    <label for="mode">Mode</label>
    <input bind:checked={appConfig.online} type="checkbox" name="mode" id="" class="toggle">
    <button
      class="btn btn-error flex-row gap-0 min-h-0 box-border py-1 px-2 m-0 h-6 w-20"
      on:click={resetConfig}
    >
      <Fa icon={faArrowRotateLeft} />&nbsp;
      Reset
    </button>
  </div>
  {/await}
</main>

<style lang="postcss">
  label {
    @apply flex items-center;
  }
</style>
