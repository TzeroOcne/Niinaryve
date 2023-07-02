<script lang="ts" type="module">
  import { faXmark } from '@fortawesome/free-solid-svg-icons';
  import { APP_ID } from '@global';
  import type { AuthorSummary } from '@types';
  import Fa from 'svelte-fa';
  import { authorStore } from './lib/app.store';
  let show = true;
  const appContainer = document.querySelector(
    `div#${APP_ID}`
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
    <button on:click={hideMenu}>
      <Fa icon={faXmark} />
    </button>
  {/if}
</main>

<style>
</style>
