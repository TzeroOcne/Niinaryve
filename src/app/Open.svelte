<script lang="ts">
  import { faBars } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import './open.css';
  let show = true;
</script>

<div>
  {#if show}
    <Fa icon={faBars} />
  {/if}
</div>
