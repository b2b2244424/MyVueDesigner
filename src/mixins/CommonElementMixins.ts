import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import DragData from "../types/DragData";
import BusEvents from "../events/BusEvents";
@Component({
  components: {}
})
export default class CommonContainerMixins extends Vue {
  @Prop({ default: "" })
  public id!: string;
  @Prop({ default: () => ({}) })
  public css!: { [key: string]: any };
  @Prop({ default: () => ({}) })
  public customData!: { [key: string]: any };
  @Prop({ default: () => [] })
  public components!: DragData[];
  @Prop({})
  public mouseDown!: Function;
  @Prop({ default: "" })
  public useless!: string;

  public id1: string = "";
  public css1: { [key: string]: any } = {};
  public components1: any[] = [];
  public customData1: { [key: string]: any } = {};
  public mouseDown1: Function = this.emptyMouseDown;

  @Watch("components")
  componentsChanged() {
    this.components1 = this.components;
  }

  @Watch("customData", { deep: true, immediate: true })
  customDataChanged() {
    // console.log("customData:");
    // console.dir(this.customData);
    this.customData1 = this.customData;
  }

  @Watch("css", { deep: true, immediate: true })
  cssChanged() {
    // console.log("css:");
    // console.dir(this.css);
    this.css1 = this.css;
  }

  @Watch("id", { deep: true, immediate: true })
  idChanged() {
    this.id1 = this.id;
    // console.log("id1:" + this.id1);
  }

  @Watch("mouseDown", { deep: true, immediate: true })
  mouseDownChanged() {
    this.mouseDown1 = this.mouseDown;
    if (!this.mouseDown1) {
      this.mouseDown1 = this.emptyMouseDown;
    }
  }

  public emptyMouseDown(event: MouseEvent) {}
  public clickEvent(event: any) {
    event.stopPropagation();
    if (this.isClick) {
      (this as any).$eventBus.$emit(BusEvents.SUB_COMPONENT_SELECTED, this.id);
      this.isClick = false;
      this.mouseDownStartTime = 0;
    }
  }

  private mouseDownStartTime: number = 0;
  private isClick: boolean = false;

  public innerMouseDown(event: any, id: string, el: HTMLElement) {
    this.mouseDownStartTime = new Date().getTime();
    this.isClick = false;
    if (this.mouseDown1) {
      this.mouseDown1(event, id, el);
    }
  }

  public innerMouseUp(event: any) {
    let endTime: number = new Date().getTime();
    let span: number = endTime - this.mouseDownStartTime;
    console.log("innerMouseUp:" + span);
    if (span < 150) {
      this.isClick = true;
    }
  }
}
