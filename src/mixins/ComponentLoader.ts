import { Component, Vue } from "vue-property-decorator";
import ComponentConfig from "../types/ComponentConfig";
import componentConfigs from "../configs/componentConfigs";
import ComponentCategoryInfo from "../types/ComponentCategoryInfo";
import ComponentInfo from "../types/ComponentInfo";
import ComponentLoaderDelegate from "./ComponentLoaderDelegate";
import loaderDelegate from "./loaderDelegate";
@Component({
  components: {}
})
export default class ComponentLoader extends Vue {
  public loaderDelegate: ComponentLoaderDelegate = loaderDelegate;
  public vueComponentConfigs: ComponentConfig[] = componentConfigs;

  public loadComponent(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    return this.loaderDelegate.loadComponent(
      libName,
      categoryName,
      componentName
    );
  }

  public loadSchema(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    return this.loaderDelegate.loadSchema(libName, categoryName, componentName);
  }

  public loadDefaultData(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    return this.loaderDelegate.loadDefaultData(
      libName,
      categoryName,
      componentName
    );
  }

  public loadDefaultCss(
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    return this.loaderDelegate.loadDefaultCss(
      libName,
      categoryName,
      componentName
    );
  }
}
