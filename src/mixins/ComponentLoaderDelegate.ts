import ComponentConfig from "../types/ComponentConfig";
import componentConfigs from "../configs/componentConfigs";
import ComponentCategoryInfo from "../types/ComponentCategoryInfo";
import ComponentInfo from "../types/ComponentInfo";
export default class ComponentLoaderDelegate {
  public vueModules: { [key: string]: any } = {};
  public vueSchemas: { [key: string]: any } = {};
  public vueComponentConfigs: ComponentConfig[] = componentConfigs;
  public vueDefaultData: { [key: string]: any } = {};
  public vueDefaultCss: { [key: string]: any } = {};

  public loadComponent(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    let key: string = `../components/uilibs/${libName}/${categoryName}/${componentName}`;
    // console.log("loading:" + key);
    if (!this.vueModules[key]) {
      // console.log(key + " not exist");
      // this.vueModules[key] = import(
      //   `../components/uilibs/${libName}/${categoryName}/${componentName}`
      // );
      this.vueModules[key] = () =>
        import(
          `../components/uilibs/${libName}/${categoryName}/${componentName}`
        ).then((module: any) => {
          return module.default;
        });
      console.dir(this.vueModules[key]);
    }
    return this.vueModules[key];
  }

  public loadSchema(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    let key: string = `../components/uilibs/${libName}/${categoryName}/${componentName}/schema.ts`;
    if (!this.vueSchemas[key]) {
      this.vueSchemas[
        key
      ] = require(`../components/uilibs/${libName}/${categoryName}/${componentName}/schema.ts`).default;
    }
    return this.vueSchemas[key];
  }

  public loadDefaultData(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    let key: string = `../components/uilibs/${libName}/${categoryName}/${componentName}/data.json`;
    if (!this.vueDefaultData[key]) {
      this.vueDefaultData[
        key
      ] = require(`../components/uilibs/${libName}/${categoryName}/${componentName}/data.json`);
    }
    return this.vueDefaultData[key];
  }

  public loadDefaultCss(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    let key: string = `../components/uilibs/${libName}/${categoryName}/${componentName}/css.json`;
    if (!this.vueDefaultCss[key]) {
      this.vueDefaultCss[
        key
      ] = require(`../components/uilibs/${libName}/${categoryName}/${componentName}/css.json`);
      // console.error("json data:");
      // console.dir(this.defaultCss[key]);
    }
    return this.vueDefaultCss[key];
  }

  public loadComponents() {
    this.vueComponentConfigs.forEach((e: ComponentConfig) => {
      e.categories.forEach((e2: ComponentCategoryInfo) => {
        e2.components.forEach((e3: ComponentInfo) => {
          this.loadComponent(e.name, e2.name, e3.name);
          this.loadSchema(e.name, e2.name, e3.name);
          this.loadDefaultData(e.name, e2.name, e3.name);
          this.loadDefaultCss(e.name, e2.name, e3.name);
        });
      });
    });
  }

  public init() {
    this.loadComponents();
  }
}
