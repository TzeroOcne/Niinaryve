<script lang="ts" type="module">
  import type { AuthorSummary } from '../../@types/livechat';
  import Bar from './lib/Bar.svelte';
  import { authorStore } from './lib/app.store';
  let show = true;
  const appContainer = document.querySelector(
    'div#ytclinker'
  ) as HTMLDivElement;
  const hideMenu = () => {
    show = false;
    appContainer.classList.add('hide');
  };
  appContainer.addEventListener('livechat', (e: CustomEvent) => {
    const authorList: AuthorSummary[] = e.detail;
    authorList.forEach((author) => {
      const { id } = author;
      if (!(id in $authorStore)) {
        $authorStore[id] = author;
      }
    });
  });

  console.log('[YTChatVerifier] App loaded');
</script>

<main>
  {#if show}
    <div>Svelte Test App</div>
    <button on:click={hideMenu}>
      <Bar />
    </button>
  {/if}
</main>

<style>
  div {
    color: #ff00ff;
    background-color: inherit;
  }
</style>
