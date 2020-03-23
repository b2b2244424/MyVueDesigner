<template>
  <div
    :style="css"
    :id="id"
    @drop="onDrop2"
    @dragover="onDragOver"
    @mousedown="innerMouseDown($event, id, $el)"
    @mouseup="innerMouseUp"
    @click="clickEvent"
  >
    <template v-for="(item, index) in components">
      <component
        :is="loadComponent(item.libName, item.categoryName, item.componentName)"
        :id="item.id"
        :css="item.css"
        :customData="item.defaultData"
        :components="item.children"
        :mouseDown="onMouseDown"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import ComponentLoader from "../../../../../mixins/ComponentLoader";
import CommonContainerMixins from "../../../../../mixins/CommonContainerMixins";
import DragData from "../../../../../types/DragData";
import LocalEventInfo from "../../../../../types/LocalEventInfo";
import BusEvents from "../../../../../events/BusEvents";
import ComponentType from "../../../../../types/ComponentType";
@Component
export default class AbsoluteBox extends Mixins(
  CommonContainerMixins,
  ComponentLoader
) {
  public onDragOver(event: any) {
    console.log("AbsoluteBox.onDragOver");
  }

  //-------------------------事件响应 BEGIN-------------------------
  /**
   * 拖动到指定target时触发：当组件拖动到页面组件时触发
   */
  public onDrop2(event: any) {
    console.log("AbsoluteBox.onDrop");
    event.stopPropagation();
    let dragData: DragData = JSON.parse(event.dataTransfer.getData("Text"));
    console.log("drop dragData");
    console.dir(dragData);

    dragData.css.position = "absolute";
    dragData.css.display = "block";
    dragData.css.top = event.offsetY + "px";
    dragData.css.left = event.offsetX + "px";

    (this as any).$eventBus.$emit(BusEvents.COMPONENT_ADDED, this.id, dragData);
    // setTimeout(() => {
    //   this.refreshChildren();
    // }, 20);
  }

  public onMouseDown(event: MouseEvent, id: string, el: HTMLElement) {
    console.log("mouseDown");
    this.mouseDownStartTime = new Date().getTime();
    this.isClick = false;
    console.log("innerMouseDown:" + this.mouseDownStartTime);

    let oevent: any = event;
    let distanceX: number = oevent.clientX - el.offsetLeft;
    let distanceY: number = oevent.clientY - el.offsetTop;
    let dragData: any = this.getDataById(id);
    if (!dragData) return;
    //组件移动
    let current: any = this;
    document.onmousemove = function(mouseev: any) {
      // console.error("onmousemove");
      let mouseevent: any = mouseev || event;
      dragData.css.top = mouseevent.clientY - distanceY + "px";
      dragData.css.left = mouseevent.clientX - distanceX + "px";
      (current as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
    };
    document.onmouseup = function(e: any) {
      document.onmousemove = null;
      document.onmouseup = null;
      e.stopPropagation();
    };
    event.stopPropagation();
  }

  private getDataById(id: string) {
    return this.searchDataById(this.components, id);
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
}
</script>
