import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class ComponentMixins extends Vue {
  @Prop({ default: "" })
  public value!: string | number;
  @Prop({ default: false })
  public readonly!: boolean;
  @Prop({ default: "" })
  public placeholder!: string;
  @Prop({ default: () => {} })
  public properties!: { [key: string]: any };
  @Prop({ default: () => {} })
  public schema!: { [key: string]: any };
  @Prop({ default: () => {} })
  public constraint!: { [key: string]: any };
  @Prop({ default: "" })
  public title!: string;

  get currentValue() {
    return this.value;
  }

  set currentValue(val: string | number) {
    const formatValue = this.schema.type === "number" ? Number(val) : val;
    this.change(formatValue);
  }

  public change(value: any) {
    this.$emit("change", value);
  }
}
