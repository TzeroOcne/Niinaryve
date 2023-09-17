<script lang="ts">
  import { faBars } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { writable } from 'svelte/store';
  import Menu from './Menu.svelte';
  let show = writable(false);
</script>

<div id="app-container"
  class:yt-spec-button-shape-next--text={!$show}
  class="
    yt-spec-button-shape-next
    yt-spec-button-shape-next--mono
    yt-spec-button-shape-next--icon-only-default
    relative
  "
>
  <button
    class="
      yt-spec-button-shape-next
      yt-spec-button-shape-next--icon-only-default
    "
    on:click={() => show.set(!$show)}
  >
    <Fa icon={faBars} class="min-w-[16px] min-h-[16px]"/>
  </button>
  <Menu {show} />
</div>

<style>
  div#app-container {
    align-items: center;
    justify-items: center;
    width: 40px;
  }

  div#app-container>button {
    background-color: unset;
    border: none;
    color: white;
    padding: 0;
  }
</style>
