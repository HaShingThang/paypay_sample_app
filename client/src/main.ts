import "mdb-vue-ui-kit/css/mdb.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

createApp(App).use(store).use(i18n).use(router).mount("#app");
