export default {
  install(Vue: any, options: any) {
    console.log("install i18n,options:");
    console.dir(options);
    const parser = (key: string) => {
      let result = options;
      const arr = key.split(".");
      for (let i = 0; i < arr.length; i++) {
        result && (result = result[arr[i]]);
      }
      console.log("key:" + key + ";result:" + result);
      return result || key;
    };

    Vue.filter("i18n", parser);
    Vue.directive("i18n", {
      bind(el: any, param: { value: any }) {
        el.textContent = parser(param.value);
      },
      update(el: any, param: { value: any }) {
        el.textContent = parser(param.value);
      }
    });
    Vue.prototype.$i18n = parser;
  }
};
