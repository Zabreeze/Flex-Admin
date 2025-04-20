import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import pinia from "./store";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
