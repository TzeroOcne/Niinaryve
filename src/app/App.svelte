<script lang="ts" type="module">
  import { faXmark } from '@fortawesome/free-solid-svg-icons';
  import { APP_ID } from '@global';
  import type { AuthorSummary } from '@types';
  import Fa from 'svelte-fa';
  import Chatter from './lib/Chatter.svelte';
  import ChatterSelected from './lib/ChatterSelected.svelte';
  import { addChat, authorSet, authorStore, selectedAuthor } from './lib/app.store';
  let show = false;
  let localAuthorList:string[] = [];

  const appContainer = document.querySelector(
    `div#${APP_ID}`
  ) as HTMLDivElement;
  
  const setShow = (value:boolean) => {
    show = value;
    if (value) {
      appContainer.classList.remove('hide');
    } else {
      appContainer.classList.add('hide');
    }
  };

  const hideMenu = () => {
    setShow(false);
  };
  
  appContainer.addEventListener('livechat', (e: CustomEvent) => {
    const authorList: AuthorSummary[] = e.detail;
    authorList.forEach((author) => {
      addChat(author);
    });
  });
  
  appContainer.addEventListener('nnryv-app-event-toggle-show', () => {
    setShow(!show);
  });
  
  authorSet.subscribe(authorSetValue => {
    localAuthorList = [...authorSetValue]
      .filter(id => $authorStore[id]?.authorName?.simpleText)
      .sort((firstId, secondId) => 
        $authorStore[firstId].authorName.simpleText.toLowerCase() <
        $authorStore[secondId].authorName.simpleText.toLowerCase() ? -1 : 1
      );
  });

  console.log('[YTChatVerifier] App loaded');
</script>

<main>
  {#if show}
  <button id="nnryv-close" on:click={hideMenu}>
    <Fa icon={faXmark} />
  </button>
  <div id="nnryv-author-list-container">
    {#if $selectedAuthor}
    <ChatterSelected />
    {/if}
    <div id="nnryv-author-list-content">
      {#each localAuthorList as authorId }
      <Chatter user={$authorStore[authorId]} />
      {/each}
    </div>
  </div>
  {/if}
</main>

<style>
  main {
    margin: 16px 0;
    height: 100%;
    padding-top: 8px;
  }
  
  #nnryv-close {
    margin-right: 8px;
  }
  
  #nnryv-author-list-container {
    background-color: #181818;
    font-size: 13px;
    font-weight: bold;
    height: 90%;
    margin: 5% 0;
    position: relative;
  }

  #nnryv-author-list-content {
    overflow-y: scroll;
    height: 100%;
  }
</style>
