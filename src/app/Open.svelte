<script lang="ts">
  import { faBars, faClock } from '@fortawesome/free-solid-svg-icons';
  import { APP_ID, changeProperty } from '@global';
  import Fa from 'svelte-fa';
  import './open.css';
  const root = document.querySelector(':root') as HTMLElement;
  let timestampMode:'absolute'|'relative' = 'relative';

  const appContainer = document.querySelector(
    `div#${APP_ID}`
  ) as HTMLDivElement;
  
  const toggleApp = () => {
    appContainer.dispatchEvent(new CustomEvent('nnryv-app-event-toggle-show'));    
  };
  
  const toggleTimestamp = () => {
    timestampMode = timestampMode == 'absolute' ? 'relative' : 'absolute';
  };
  
  $: {
    if (timestampMode == 'absolute') {
      changeProperty(root, 'nnryv-timestamp-display-absolute', 'inline');
      changeProperty(root, 'nnryv-timestamp-display-relative', 'none');
    } else {
      changeProperty(root, 'nnryv-timestamp-display-absolute', 'none');
      changeProperty(root, 'nnryv-timestamp-display-relative', 'inline');
    }
  }
</script>

<div id="button-container" class="
  yt-spec-button-shape-next
  yt-spec-button-shape-next--mono
  yt-spec-button-shape-next--text
  yt-spec-button-shape-next--icon-only-default
">
  <button
    on:click={toggleTimestamp}
    class="
      yt-spec-button-shape-next
      yt-spec-button-shape-next--icon-only-default
    "
  >
    <Fa icon={faClock} />
  </button>
</div>
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
