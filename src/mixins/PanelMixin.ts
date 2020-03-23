import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
@Component({})
export default class PanelMixin extends Vue {
  @Prop({ default: () => {} })
  public schema!: any;
  @Prop({ default: () => {} })
  public data!: any;

  public change(key: string, value: any) {
    console.log("change,key:" + key + ";value:" + value);
    this.$emit("change", key, value);
  }
}
