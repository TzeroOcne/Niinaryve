<script lang="ts">
  import { listenDocumentEvent } from '$lib/document';
  import { PREFIX } from '$lib/extension/global';
  import { faX } from '@fortawesome/free-solid-svg-icons';
  import type { AuthorSummary } from '@types';
  import Fa from 'svelte-fa';
  import { writable } from 'svelte/store';
  import ChatterUser from './ChatterUser.svelte';
  let chatterList:Record<string,AuthorSummary> = {};
  let sortedChatterList:AuthorSummary[] = [];
  let filteredList:AuthorSummary[] = [];
  let search = '';
  let searchRegex = new RegExp('');
  let debounceTimerId:NodeJS.Timeout;
  let show = false;
  let messageList:string[] = [];
  let selectedAuthor = writable<AuthorSummary>();
  console.log(`${PREFIX} Chatter loaded`);

  $: {
    clearTimeout(debounceTimerId);
    debounceTimerId = setTimeout(() => {
      searchRegex = new RegExp(search.split('').join('.*'), 'i');
    }, 400);
  }

  $: {
    filteredList = sortedChatterList.filter((value) => searchRegex.test(value?.authorName?.simpleText ?? ''));
  }

  selectedAuthor.subscribe((value) => {
    const channelId = value?.authorExternalChannelId;
    const selector = `yt-live-chat-text-message-renderer[data-channel-id="${channelId}"] span#message`;
    const newMessageList = [];
    for (const selected of (document.querySelectorAll(selector) as NodeListOf<HTMLSpanElement>)) {
      newMessageList.push(selected.innerHTML);
    }
    messageList = newMessageList;
  });

  listenDocumentEvent('nnryv-livechat', (event) => {
    const authorList:AuthorSummary[] = event.detail;
    for (const author of authorList) {
      if (author?.authorExternalChannelId) {
        chatterList[author.authorExternalChannelId] = author;
      }
    }
    const newChatterList = [...Object.values(chatterList)];
    newChatterList.sort(
      (first, second) =>
        first?.authorName?.simpleText?.localeCompare(
          second?.authorName?.simpleText ?? '',
        ) ?? 0,
    );
    sortedChatterList = newChatterList;
  });

  listenDocumentEvent('nnryv-chatter-show', () => {
    show = true;
  });

  listenDocumentEvent('nnryv-chatter-hide', () => {
    show = false;
  });
</script>

<div
  id="nnryv-chatter"
  class:show
  class="fixed h-full w-full bg-base-100 top-0 box-content flex flex-col"
>
  <div class="bg-neutral w-full p-4">
    <div
      id="nnryv-chatter-menu-bar"
      class="w-full h-fit box-content flex items-center gap-8"
    >
      <input
        type="text"
        placeholder="search"
        class="input input-bordered grow"
        bind:value={search}
      >
      <button class="btn h-[32px] w-[32px] box-border"
        on:click={() => show = false}
      >
        <Fa icon={faX} />
      </button>
    </div>
  </div>
  <div class="grow overflow-y-hidden">
    <div class="h-full overflow-y-auto">
      {#each filteredList as author}
      <ChatterUser {...{author, selectedAuthor}} />
      {/each}
    </div>
  </div>
</div>
<dialog id="nnryv-chatter-modal" class="modal">
  <div class="modal-box">
    <div class="avatar mr-4 inline-flex items-center mb-8">
      <div class="w-8 rounded-full mr-8">
        <img src={$selectedAuthor?.photo} alt="">
      </div>
      <h3 class="font-bold">{$selectedAuthor?.authorName?.simpleText}</h3>
    </div>
    <div class="max-h-[50vh] overflow-y-auto">
    {#each messageList as message}
    <div class="w-full h-max bg-base-200 even:bg-base-300 flex items-center py-4">
      <span id="message" dir="auto" class="style-scope yt-live-chat-text-message-renderer">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html message}
      </span>
    </div>
    {/each}
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<style>
  dialog {
    font-size: 16px;
  }
</style>