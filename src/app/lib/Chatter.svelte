<script lang="ts">
  import type { AuthorSummary, ButtonEventHandler } from '@types';
  import { selectedAuthor } from './app.store';
  import './chatter.css';

  export let user:AuthorSummary = undefined;
  
  const selectAuthor:ButtonEventHandler = (e) => {
    selectedAuthor.set(user);
  };
  const userBadgeClass = ['nnryv-verifier', ...(user?.badgeList ?? [])].join(' ');
</script>

{#if user && user?.authorName?.simpleText}
<button id={user.id} class="nnryv-author-container"
  on:click={selectAuthor}
>
  <div id="nnryv-author-photo">
    {#if user?.photo && user.photo !== ''}
    <img src={user.photo} alt="" height="24" width="24" srcset="">
    {/if}
  </div>
  <div id="nnryv-author-name">
    <span class={userBadgeClass}>
      {user.authorName.simpleText}
    </span>
    <span>
      {#if user?.badgeImg}
      <img id="nnryv-badge-image" src={user.badgeImg} alt="" srcset="">
      {/if}
    </span>
  </div>
</button>
{/if}

<style>
  .nnryv-author-container {
    padding: 4px 24px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    border: none;
    background-color: inherit;
  }

  .nnryv-author-container:hover {
    background-color: var(--yt-spec-additive-background);
    cursor: pointer;
  }

  .nnryv-author-container:hover:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .nnryv-author-container * {
    background-color: unset;
  }

  #nnryv-author-photo {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    overflow: hidden;
    margin-right: 16px;
  }
  
  #nnryv-author-name {
    display: inline-flex;
  }
</style>
