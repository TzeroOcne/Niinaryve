<svelte:options
  customElement="nnryv-chat-username"
/>

<script lang="ts">
  export let link:string;
  export let label:string;
</script>

<a href={link}>
  {label}
</a>
