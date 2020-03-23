<template>
  <div style="position: relative;">
    <!-- 设计界面 -->
    <div :style="myStyle" @drop="drop" @dragover="allowDrop">
      <component
        :is="
          loadComponent(
            componentData.libName,
            componentData.categoryName,
            componentData.componentName
          )
        "
        :id="id1"
        :css="componentData.css"
        :customData="componentData.defaultData"
        :components="componentData.children"
      />
    </div>

    <div class="dragover-box" :style="dragoverBox.style">
      <div class="dragover-hint">{{ dragoverBox.hint }}</div>
    </div>

    <div
      class="position-select-box"
      :style="selectBox.style"
      @click="unselectComponent"
    >
      <div class="position-select-handle" ref="positionSelectHandle">
        <i class="handle-top-left" data-direction="top-left"></i>
        <i class="handle-top" data-direction="top"></i>
        <i class="handle-top-right" data-direction="top-right"></i>
        <i class="handle-bottom-left" data-direction="bottom-left"></i>
        <i class="handle-bottom" data-direction="bottom"></i>
        <i class="handle-bottom-right" data-direction="bottom-right"></i>
        <i class="handle-left" data-direction="left"></i>
        <i class="handle-right" data-direction="right"></i>
      </div>
      <div class="position-select-actions f f-ai-c">
        <i
          class="icon-generate-component"
          title="Generate component"
          @click="generateComponent($event, componentId)"
        ></i>
        <i class="icon-left-up" title="Select parent"></i>
        <i
          class="el-icon-caret-top"
          title="Up"
          @click="componentUp($event, componentId)"
        ></i>
        <i
          class="el-icon-caret-bottom"
          title="Down"
          @click="componentDown($event, componentId)"
        ></i>
        <i
          class="el-icon-delete"
          title="Remove"
          @click="deleteComponent($event, componentId)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";

let PageComponentJson = require("./component.json");
import ComponentLoader from "../mixins/ComponentLoader";
import SelectBoxMixins from "../mixins/SelectBoxMixins";
import DragEventMixins from "../mixins/DragEventMixins";
import CommonContainerMixins from "../mixins/CommonContainerMixins";
import DragData from "../types/DragData";
import LocalEventInfo from "../types/LocalEventInfo";
import ComponentType from "../types/ComponentType";
import PageConfig from "../types/PageConfig";
import BusEvents from "../events/BusEvents";

//屏蔽鼠标右键事件
document.oncontextmenu = function() {
  return false;
};

@Component({})
export default class PageComponent2 extends Mixins(
  CommonContainerMixins,
  ComponentLoader,
  SelectBoxMixins,
  DragEventMixins
) {
  @Prop({ default: new PageConfig() })
  public config!: PageConfig;
  @Prop({ default: () => new DragData() })
  public componentData!: DragData;
  // @Prop({ default: "" })
  // public initComponentId: string;

  public componentId: string = "";

  get config1() {
    return this.config;
  }

  private myStyle: { [key: string]: any } = {};

  // @Watch("initComponentId", { deep: true, immediate: true })
  // initComponentIdChanged() {
  //   this.componentId = this.initComponentId;
  // }

  @Watch("config", { deep: true, immediate: true })
  onConfigChanged() {
    this.myStyle.width = this.config.width + "px";
    this.myStyle.height = this.config.height + "px";
    this.myStyle.backgroundColor = this.config.backgroundColor;
    this.myStyle.margin = this.config.margin;
    this.myStyle.border = this.config.border;
    this.myStyle.zIndex = this.config.zIndex;
    this.myStyle.boxSizing = "content-box";
  }

  public drop(event: any) {
    event.stopPropagation();
  }

  public allowDrop(event: any) {
    event.preventDefault();
  }

  /**
   * 组件生命周期：mouted
   */
  public mounted() {
    var current = this;

    (this as any).$eventBus.$on(
      BusEvents.CHANGE_STYLE,
      this.componentStyleChanged
    );

    (this as any).$eventBus.$on(
      BusEvents.CHANGE_CUSTOM_DATA,
      this.componentCustomDataChanged
    );

    (this as any).$eventBus.$on(
      BusEvents.SUB_COMPONENT_SELECTED,
      this.subComponentSelected
    );

    // let id: string = this.componentData.useless;
    // this.componentData.useless = (this as any).$uuid();
    // setTimeout(() => {
    //   this.componentData.useless = id;
    // }, 20);
  }

  private subComponentSelected(id: string) {
    console.error("subComponentSelected:" + id);
    if (id === "pageDesign" || id === "") {
      this.unselectComponent();
    } else {
      this.componentId = id;
      let dragData: any = this.getDataById(id);
      if (!dragData) return;
      let type: ComponentType = {
        type: "",
        libName: dragData.libName,
        categoryName: dragData.categoryName,
        componentName: dragData.componentName,
        id: dragData.id,
        schema: this.loadSchema(
          dragData.libName,
          dragData.categoryName,
          dragData.componentName
        ),
        data: dragData.defaultData,
        css: dragData.css
      };
      (this as any).$eventBus.$emit("componentSelected", type);
      this.$nextTick(() => {
        this.paintSelectBox();
      });
    }
  }

  private componentStyleChanged(id: string, key: string, value: any) {
    let data: any = this.getDataById(id);
    console.log("PageComponent2 selected data ,id:" + id);
    console.log("all data:");
    console.dir(data);
    if (data) {
      data.css[key] = value;
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
      this.$nextTick(() => {
        this.paintSelectBox();
      });
    }
  }

  private getDataById(id: string) {
    return this.searchDataById(this.componentData.children, id);
  }

  private searchDataById(dragDatas: DragData[], id: string) {
    let index: number = -1;
    for (let index = 0; index < dragDatas.length; index++) {
      if (dragDatas[index].id === id) {
        return dragDatas[index];
      } else {
        let data: any = this.searchDataById(dragDatas[index].children, id);
        if (data) {
          return data;
        }
      }
    }
    return null;
  }

  private componentCustomDataChanged(id: string, key: string, value: any) {
    let data: any = this.getDataById(id);
    if (data) {
      data.defaultData[key] = value;
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
      this.$nextTick(() => {
        this.paintSelectBox();
      });
    }
  }

  @Watch("componentId")
  onComponentIdChanged() {
    this.paintSelectBox();
  }

  public paintSelectBox() {
    // console.dir(vc);
    if (this.componentId && this.componentId.length > 0) {
      let parentRect: DOMRect = this.$el.getBoundingClientRect() as DOMRect;
      console.log("parent component position:");
      console.dir(parentRect);

      let child: HTMLElement = document.getElementById(
        this.componentId
      ) as HTMLElement;
      let rect: DOMRect = child.getBoundingClientRect() as DOMRect;
      console.log("current component position:");
      console.dir(rect);
      this.selectBox = {
        style: {
          display: "block",
          width: rect.width + "px",
          height: rect.height + "px",
          top: rect.top - parentRect.top + "px",
          left: rect.left - parentRect.left + "px"
        }
      };
      console.log("select box position:");
      console.dir(this.selectBox);
    } else {
      console.error("no component selected");
      this.selectBox = {
        style: {}
      };
    }
  }

  private pageClick() {
    console.log("pageClick");
    this.unselectComponent();
  }

  private unselectComponent() {
    this.componentId = "";
    let type: ComponentType = {
      type: "",
      libName: "",
      categoryName: "",
      componentName: "",
      id: "",
      schema: {},
      data: {},
      css: {}
    };
    (this as any).$eventBus.$emit("componentSelected", type);
  }

  private deleteComponent(event: any, id: string) {
    console.log("deleteComponent,id:" + id);
    this.tryDeleteSubComponent(this.componentData, id);
    this.unselectComponent();
    (this as any).$eventBus.$emit(BusEvents.COMPONENT_REMOVED);
  }

  private generateComponent(event: any, id: string) {
    this.unselectComponent();
    (this as any).$eventBus.$emit(BusEvents.GENERATE_COMPONENT, id);
  }

  private componentUp(event: any, id: string) {
    this.unselectComponent();
    (this as any).$eventBus.$emit(BusEvents.COMPONENT_UP, id);
  }

  private componentDown(event: any, id: string) {
    this.unselectComponent();
    (this as any).$eventBus.$emit(BusEvents.COMPONENT_DOWN, id);
  }

  private tryDeleteSubComponent(dragData: DragData, id: string) {
    let data: any = dragData.children.find((e: DragData) => {
      return e.id === id;
    });
    if (data) {
      console.log("deleteComponent success");
      dragData.children.splice(dragData.children.indexOf(data), 1);
      return true;
    } else {
      data = dragData.children.find((e: DragData) => {
        return this.tryDeleteSubComponent(e, id);
      });
      if (data) return true;
      else {
        return false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../styles/variables";
.pagedesign-container {
  position: relative;
}

.dragover-box,
.select-box,
.position-select-box {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: 1;
  outline: 1px solid @primary-color;
  pointer-events: none;
}

.dragover {
  &-box {
    outline: 1px dashed @primary-color;
    background: rgba(187, 218, 239, 0.5);
  }
  &-hint {
    text-align: center;
    color: @white-color;
    background: @primary-color;
  }
}

.position-select {
  &-box {
    outline: 1px dashed @primary-color;
    pointer-events: none;
  }
  &-handle {
    width: 100%;
    height: 100%;
    pointer-events: auto;
    cursor: grab;
    i {
      position: absolute;
      display: inline-block;
      width: 9px;
      height: 9px;
      border: 1px solid @primary-color;
    }
    .handle {
      &-top-left {
        top: -5px;
        left: -5px;
        cursor: nwse-resize;
      }
      &-top {
        top: -5px;
        left: 50%;
        margin-left: -5px;
        cursor: ns-resize;
      }
      &-top-right {
        top: -5px;
        right: -5px;
        cursor: nesw-resize;
      }
      &-bottom-left {
        bottom: -5px;
        left: -5px;
        cursor: nesw-resize;
      }
      &-bottom {
        bottom: -5px;
        left: 50%;
        margin-left: -5px;
        cursor: ns-resize;
      }
      &-bottom-right {
        bottom: -5px;
        right: -5px;
        cursor: nwse-resize;
      }
      &-left {
        top: 50%;
        left: -5px;
        margin-top: -5px;
        cursor: ew-resize;
      }
      &-right {
        top: 50%;
        right: -5px;
        margin-top: -5px;
        cursor: ew-resize;
      }
    }
  }
  &-actions {
    position: absolute;
    top: -36px;
    right: -1px;
    z-index: 2;
    border-radius: 3px 3px 0px 0px;
    overflow: hidden;
    i {
      padding: 6px;
      color: @primary-light-color;
      background: @primary-color;
      pointer-events: auto;
      line-height: 1;
      cursor: pointer;
      &:hover {
        color: @white-color;
      }
    }
  }
}
</style>
