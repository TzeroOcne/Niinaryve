import { APP_ID } from '../global';
import App from './App.svelte';
import './app.css';

const app = new App({
  target: document.getElementById(APP_ID),
});

export default app;
