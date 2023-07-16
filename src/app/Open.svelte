<script lang="ts">
  import { faBars } from '@fortawesome/free-solid-svg-icons';
  import { APP_ID } from '@global';
  import Fa from 'svelte-fa';
  import './open.css';

  const appContainer = document.querySelector(
    `div#${APP_ID}`
  ) as HTMLDivElement;
  
  const toggleApp = () => {
    appContainer.dispatchEvent(new CustomEvent('nnryv-app-event-toggle-show'));    
  };
</script>

<div id="button-container" class="
  yt-spec-button-shape-next
  yt-spec-button-shape-next--mono
  yt-spec-button-shape-next--text
  yt-spec-button-shape-next--icon-only-default
">
  <button
    on:click={toggleApp}
    class="
      yt-spec-button-shape-next
      yt-spec-button-shape-next--icon-only-default
    "
  >
    <Fa icon={faBars} />
  </button>
</div>
