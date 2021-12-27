import { createApp } from 'vue'
import router from "./router";
import { VueSignalR } from '@dreamonkey/vue-signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import App from './App.vue'

const connection = new HubConnectionBuilder()
  .withUrl(`${process.env.VUE_APP_API_URL}/notify`)
  .build();

const app = createApp(App);
app.use(router);
app.use(VueSignalR, { connection });
app.mount("#app");
