import { waitForElm } from '$lib/document';
import './extension.css';
import Popout from './Popout.svelte';

waitForElm('#app').then((selected) => {
  new Popout({
    target: selected,
  });
});

export default {};
