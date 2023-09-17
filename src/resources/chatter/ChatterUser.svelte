<script lang="ts">
  import { waitForElm } from '$lib/document';
  import { faMessage } from '@fortawesome/free-regular-svg-icons';
  import type { AuthorSummary } from '@types';
  import Fa from 'svelte-fa';
  import { writable } from 'svelte/store';
  export let author:AuthorSummary;
  export let selectedAuthor = writable(author);

  let modal:HTMLDialogElement;

  waitForElm<HTMLDialogElement>('#nnryv-chatter-modal')
    .then((result) => modal = result);
</script>

{#if author?.authorName?.simpleText}
<div id="chatter-user-container"
  class="h-12"
>
  <div class="avatar mr-4">
    <div class="w-8 rounded-full">
      <img src={author?.photo} alt="">
    </div>
  </div>
  <span
    class:member={author?.badgeList?.includes('member') ?? false}
    class:moderator={author?.badgeList?.includes('moderator') ?? false}
    class:verified={author?.badgeList?.includes('verified') ?? false}
    class="flex-grow"
  >
    <a href={`/channel/${author?.authorExternalChannelId ?? ''}`}>
      {author.authorName.simpleText}
    </a>
  </span>
  <button class="btn bg-transparent hover:bg-neutral"
    on:click={() => {
      selectedAuthor.set(author);
      modal?.showModal();
    }}
  >
    <Fa icon={faMessage} />
  </button>
</div>
{/if}

<style>
  span {
    color: var(--nnryv-name-base);
  }

  span a {
    text-decoration: none;
    color: inherit;
  }

  span.moderator {
    color: var(--nnryv-name-moderator);
  }

  span.member {
    color: var(--nnryv-name-member);
  }
</style>