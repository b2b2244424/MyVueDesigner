import { Component, Prop, Vue } from "vue-property-decorator";
import componentConfigs2 from "../configs/componentConfigs2";
@Component({
  components: {}
})
export default class ComponentLoader2 extends Vue {
  public vueModules: any = {};

  public loadComponent(name: string) {
    if (!this.vueModules[name]) {
      this.vueModules[
        name
      ] = require(`../components/PropertiesContainer/components/${name}.vue`).default;
    }
    return this.vueModules[name];
  }

  public loadPanel(name: string) {
    if (!this.vueModules[name]) {
      this.vueModules[
        name
      ] = require(`../components/PropertiesContainer/panels/${name}`).default;
    }
    return this.vueModules[name];
  }

  private loadAllComponents() {
    let current: any = this;
    componentConfigs2.components.forEach((e: string) => {
      current.loadComponent(e);
    });
    componentConfigs2.panels.forEach((e: string) => {
      current.loadPanel(e);
    });
  }

  created() {
    this.loadAllComponents();
  }
}
