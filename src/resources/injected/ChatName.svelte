<svelte:options
  customElement="nnryv-chat-username"
/>

<script lang="ts">
  export let link:string;
  export let label:string;
  export let isMember = false;
  export let isModerator = false;
  export let isVerified = false;
</script>

<span class:member={isMember} class:moderator={isModerator} class:verified={isVerified}
  class="nnryv-chat-username"
>
  <a href={link} class="nnry">
    {label}
  </a>
</span>

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
