<script lang="ts">
  import { faXmark } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { createIdSelector } from './ChatterSelected';
  import { authorChatSet, selectedAuthor } from './app.store';
  import './chatterselected.css';
  let chatDiv:HTMLDivElement;
  let nameSpan:HTMLSpanElement;
  let chatMessageSelector = ($selectedAuthor?.authorExternalChannelId) ? createIdSelector(
    $authorChatSet[$selectedAuthor.authorExternalChannelId]
  ) : '';

  const closeSelected = () => {
    selectedAuthor.set(undefined);
  };
  
  const reloadName = (node:HTMLSpanElement) => {
    const { badgeList } = $selectedAuthor;
    node.classList.remove('member', 'moderator', 'verified');
    if (badgeList.includes('member')) node.classList.add('member');
    if (badgeList.includes('moderator')) node.classList.add('moderator');
    if (badgeList.includes('verified')) node.classList.add('verified');
  };
  
  const reloadChat = (node:HTMLDivElement) => {
    let newInner = '';
    for (const chatTarget of document.querySelectorAll(chatMessageSelector)) {
      newInner += chatTarget.outerHTML;
    }
    node.innerHTML = newInner;
  };
  
  selectedAuthor.subscribe((author) => {
    if (!author) return;
    chatMessageSelector = createIdSelector($authorChatSet[
      author.authorExternalChannelId
    ]);
    if (chatDiv) reloadChat(chatDiv);
    if (nameSpan) reloadName(nameSpan);
  });
  
  const onChatLoad = (node:HTMLDivElement) => {
    reloadChat(node);
  };
  
  const onNameLoad = (node:HTMLSpanElement) => {
    reloadName(node);
  };
</script>

<div id="nnryv-author-selected">
  <button id="nnryv-selected-close" on:click={closeSelected}>
    <Fa icon={faXmark} />
  </button>
  <div id="nnryv-selected-profile">
    <img id="nnryv-selected-profile-photo"
      src={$selectedAuthor?.photo ?? ''} alt="" srcset=""
    >
    <div id="nnryv-selected-profile-text">
      <span id="nnryv-selected-name" class="nnryv-verifier" bind:this={nameSpan} use:onNameLoad>
        <a href={$selectedAuthor?.authorExternalChannelId ?
          `https://www.youtube.com/channel/${$selectedAuthor?.authorExternalChannelId}` : '#'
          }
        >
          {$selectedAuthor?.authorName?.simpleText ?? ''}
        </a>
      </span>
      {#if $selectedAuthor.badgeImg}
      <span>
        <img id="nnryv-badge-image" src={$selectedAuthor.badgeImg} alt="" srcset="">
      </span>
      {/if}
    </div>
  </div>
  <div id="nnryv-selected-message" bind:this={chatDiv} use:onChatLoad>
  </div>
</div>

<style>
  #nnryv-author-selected {
    color: red;
    position: absolute;
    background-color: #101010;
    width: calc(100% - 16px);
    padding: 8px;
  }
  
  #nnryv-selected-close {
    position: absolute;
    right: 8px;
  }

  #nnryv-selected-profile {
    text-align: left;
    display: flex;
  }
  
  #nnryv-selected-profile-photo {
    border-radius: 50%;
    overflow: hidden;
  }

  #nnryv-selected-profile-text {
    padding: 8px;
    display: inline-flex;
  }

  #nnryv-selected-name {
    left: 0;
  }
  
  #nnryv-selected-message {
    display: grid;
    text-align: left;
    padding: 8px;
  }
</style>