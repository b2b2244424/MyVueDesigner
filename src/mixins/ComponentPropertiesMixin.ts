import { Component, Vue, Watch } from "vue-property-decorator";
import CommonProperty from "../types/CommonProperty";
@Component({
  components: {}
})
export default class ComponentPropertiesMixin extends Vue {
  public properties: CommonProperty = { css: {}, style: "" };


  // @Watch("properties",{deep:true,immediate:true})
  // onPropertiesChanged(){
  //   this.repaint();
  // }

  get style() {
    console.dir(this.properties);
    if (this.properties) return this.properties.css;
    else return {};
  }

  @Watch("style", { deep: true, immediate: true })
  onStyleChanged() {
    // console.error("styleChanged");
    this.repaint();
  }

  public repaint() {
    for (var key in this.style) {
      (this.$el as any).style[key] = this.style[key];
    }
  }

  mounted() {
    this.$nextTick(() => {
      this.repaint();
    });
  }
}
