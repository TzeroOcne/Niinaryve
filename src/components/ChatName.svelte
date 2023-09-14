<svelte:options
  customElement="nnryv-chat-name"
/>

<script lang="ts">
  export let link:string;
  export let label:string;
</script>

<a href={link}>
  {label}
</a>
