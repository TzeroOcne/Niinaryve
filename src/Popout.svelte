<script lang="ts">
  import { getStoreStyleValue, store } from '$lib/extension/storage';
  import { DefaultAppConfig } from '@consts';
  import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
  import type { AppConfig } from '@types';
  import Fa from 'svelte-fa';
  import './extension.css';

  let initialized = false;
  let timerId:NodeJS.Timeout;

  const appConfig:AppConfig = {
    ...(DefaultAppConfig),
  };

  const resetConfig = () => {
    for (const key in appConfig) {
      appConfig[key] = DefaultAppConfig[key];
    }
  };

  const configLoader = (async () => {
    appConfig.baseColor = await getStoreStyleValue('nnryv-name-base') ?? appConfig.baseColor;
    appConfig.memberColor = await getStoreStyleValue('nnryv-name-member') ?? appConfig.memberColor;
    appConfig.adminColor = await getStoreStyleValue('nnryv-name-moderator') ?? appConfig.adminColor;
    initialized = true;
  })();

  $: if (initialized) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      store({
        'nnryv-name-base': appConfig.baseColor,
        'nnryv-name-member': appConfig.memberColor,
        'nnryv-name-moderator': appConfig.adminColor,
      });
    }, 400);
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
