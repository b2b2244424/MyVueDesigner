import i18n from "../i18n";

export default function loadLocaleData(Vue: any, name: string) {
  const lang =
    localStorage.getItem("lang") || navigator.language.toLocaleLowerCase();
  console.log("lang:" + lang);

  return Promise.all([
    import(`../i18n/${lang}/common`),
    import(`../i18n/${lang}/${name}`)
  ])
    .then(values => {
      const options = { common: values[0].default, [name]: values[1].default };
      console.log("options:");
      console.dir(options);
      Vue.use(i18n, options);
    })
    .catch(reson => {
      console.log("loadLocaleData: ", reson);
    });
}
