<svelte:options
  customElement="nnryv-chat-timestamp"
/>

<script lang=ts>
  export let original = '';
  export let absolute = '';
</script>

<span id="timestamp-relative">
  {original}
</span>
<span id="timestamp-absolute-local">
  {absolute}
</span>

<style>
  span#timestamp-relative {
    display: var(--nnryv-timestamp-display-relative);
  }

  span#timestamp-absolute-local {
    display: var(--nnryv-timestamp-display-absolute);
  }
</style>