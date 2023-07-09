<script lang="ts">
  import {
    faRotateLeft
  } from '@fortawesome/free-solid-svg-icons';
  import type { ButtonEventHandler, InputEventHandler } from '@types';
  import Fa from 'svelte-fa';
  import './Home.css';

  export let baseValue = '#7fffd4';
  export let memberValue = '#2ba640';
  export let moderatorValue = '#5e84f1';
  export let resetClick: ButtonEventHandler = () => undefined;
  export let onBaseChange: InputEventHandler = () => undefined;
  export let onMemberChange: InputEventHandler = () => undefined;
  export let onModeratorChange: InputEventHandler = () => undefined;
</script>

<div>
  <table>
    <tbody>
      <tr>
        <td> Base: </td>
        <td>
          <input
            type="color"
            name="base"
            id="base"
            value={baseValue}
            on:change={onBaseChange}
          />
        </td>
      </tr>
      <tr>
        <td> Member: </td>
        <td>
          <input
            type="color"
            name="member"
            id="member"
            value={memberValue}
            on:change={onMemberChange}
          />
        </td>
      </tr>
      <tr>
        <td> Moderator: </td>
        <td>
          <input
            type="color"
            name="moderator"
            id="moderator"
            value={moderatorValue}
            on:change={onModeratorChange}
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div>
    <button id="reset" on:click={resetClick}>
      <Fa icon={faRotateLeft} /> Reset
    </button>
  </div>
</div>

<style>
  table {
    padding: 4px;
  }

  button#reset, button#reset:hover:active {
    color: white;
    background-color: rgb(222, 49, 49);
    border-width: 0;
    padding: 4px;
    border-radius: 4px;
  }

  button#reset:hover {
    cursor: pointer;
    background-color: rgb(255, 58, 58);
  }
</style>
