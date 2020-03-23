import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/routes";
import store from "./store/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import uuid from "./utils/uuid";
import sleep from "./utils/sleep";
import loadLocaleData from "./utils/loadLocaleData";
import "./styles/app.less";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$uuid = uuid;
Vue.prototype.$sleep = sleep;

console.log("main.ts");

loadLocaleData(Vue, "designer").then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});

declare global {
  interface Window {
    require: any;
  }
}
