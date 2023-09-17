<script lang="ts">
  import { changeProperty, getRoot, onClickOutside } from '$lib/document';
  import { faClock, faUser } from '@fortawesome/free-regular-svg-icons';
  import { faFilter } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { writable } from 'svelte/store';
  import './menu.css';

  export let show = writable(false);

  const root = getRoot();

  let menuContainer:HTMLDivElement;
  let displayed = $show;
  let showOriginalTimestamp = true;
  let showFilter = false;
  let showChatter = true;
  let showMember = true;
  let showModerator = true;
  let showMemmod = true;

  const registerOutsideClick = () => {
    onClickOutside(menuContainer, () => {
      if (displayed) {
        show.set(false);
        showFilter = false;
      }
    }, () => {
      displayed = $show;
    });
  };

  const showChatterMenu = () => {
    document.dispatchEvent(new CustomEvent('nnryv-chatter-show'));
  };

  $: if (showOriginalTimestamp) {
    changeProperty(root, 'nnryv-timestamp-display-absolute', 'inline');
    changeProperty(root, 'nnryv-timestamp-display-relative', 'none');
  } else {
    changeProperty(root, 'nnryv-timestamp-display-absolute', 'none');
    changeProperty(root, 'nnryv-timestamp-display-relative', 'inline');
  }

  $: showMemmod = showMember || showModerator;

  $: if (showChatter) {
    root.classList.remove('nnryv-chat-hide-chatter');
  } else {
    root.classList.add('nnryv-chat-hide-chatter');
  }

  $: if (showMember) {
    root.classList.remove('nnryv-chat-hide-member');
  } else {
    root.classList.add('nnryv-chat-hide-member');
  }

  $: if (showModerator) {
    root.classList.remove('nnryv-chat-hide-moderator');
  } else {
    root.classList.add('nnryv-chat-hide-moderator');
  }

  $: if (showMemmod) {
    root.classList.remove('nnryv-chat-hide-memmod');
  } else {
    root.classList.add('nnryv-chat-hide-memmod');
  }

  $: if (menuContainer) registerOutsideClick();
</script>

<div class:show={$show}
  bind:this={menuContainer}
  id="menu-container"
  class="absolute join join-vertical z-50 top-full right-0 min-w-max box-content"
>
  <button id="menu-button"
    on:click={showChatterMenu}
  >
    <span>
      <span id="item-icon" class="mr-2">
        <Fa icon={faUser} class="inline-block" />
      </span>
      Chatter
    </span>
  </button>
  <button id="menu-button"
    on:click={() => showOriginalTimestamp = !showOriginalTimestamp}
  >
    <span>
      <span id="item-icon" class="mr-2">
        <Fa icon={faClock} class="inline-block" />
      </span>
      Time Mode
      <input id="time-toggle" type="checkbox" class="ml-2 toggle"
        bind:checked={showOriginalTimestamp}
      >
    </span>
  </button>
  <details
    id="menu-button"
    class="dropdown dropdown-left dropdown-bottom"
    bind:open={showFilter}
  >
    <summary class="btn p-0 m-0 gap-0 w-full justify-start">
      <button id="menu-button"
        on:click={() => showFilter = !showFilter}
      >
        <span class="inline-flex">
          <span id="item-icon" class="mr-2">
            <Fa icon={faFilter} class="inline-block" />
          </span>
          Filter
        </span>
      </button>
    </summary>
    <ul
      id="dropdown-content-container"
      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
    >
      <li>
        <button id="menu-button"
          on:click={() => showChatter = !showChatter}
        >
          <span>
            <span>
              Chatter
            </span>
            <input type="checkbox" class="ml-2 toggle"
              bind:checked={showChatter}
            >
          </span>
        </button>
      </li>
      <li>
        <button id="menu-button"
          on:click={() => showMember = !showMember}
        >
          <span>
            <span>
              Member
            </span>
            <input type="checkbox" class="ml-2 toggle"
              bind:checked={showMember}
            >
          </span>
        </button>
      </li>
      <li>
        <button id="menu-button"
          on:click={() => showModerator = !showModerator}
        >
          <span>
            <span>
              Moderator
            </span>
            <input type="checkbox" class="ml-2 toggle"
              bind:checked={showModerator}
            >
          </span>
        </button>
      </li>
    </ul>
  </details>
</div>

<style>
  li {
    font-size: 12px;
    line-height: 12px;
  }
</style>