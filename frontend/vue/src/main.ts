import "./assets/main.css";
import "notivue/notification.css";
import "notivue/animations.css";

import {type App, createApp} from "vue";
import Vue3Marquee from "vue3-marquee"
import {createPinia} from "pinia"
import router from "./router/index.ts"
import uiPlugin from "@nuxt/ui/vue-plugin";
import MyApp from "./App.vue";
import BaseWrapper from "@/components/base/BaseWrapper.vue";
import {ObjectPlugin} from "@vue/runtime-core";
import {createNotivue} from "notivue";

const myPlugin: ObjectPlugin = {
  install(app: App) {
    app.component("BaseWrapper", BaseWrapper);
  }
}

const notivue = createNotivue({
  limit: 2
});
const app = createApp(MyApp);

app.use(uiPlugin);
app.use(notivue);
app.use(myPlugin)
app.use(createPinia())
app.use(router);
app.use(Vue3Marquee)

app.mount("#app");
