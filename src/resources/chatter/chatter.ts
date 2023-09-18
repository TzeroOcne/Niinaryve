import { getChatApp } from '$lib/extension/global';
import Chatter from './Chatter.svelte';
import './chatter.css';

getChatApp().then((selected) => {
  new Chatter({
    target: selected,
  });
});