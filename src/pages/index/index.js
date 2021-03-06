import Vue from "vue";
import App from "./App.vue";
import "../../registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../../styles/app.less";
import uuid from "../../utils/uuid";
import sleep from "../../utils/sleep";
import loadLocaleData from "../../utils/loadLocaleData";
import store from "@/store/store";
import router from "../../router/routes";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$uuid = uuid;
Vue.prototype.$sleep = sleep;
console.dir("index");
loadLocaleData(Vue, "projects").then(() => {
  new Vue({
    router: router,
    store: store,
    render: h => h(App),
    el: '#app'
  });
});

// declare global {
//   interface Window {
//     require: any;
//   }
// }
